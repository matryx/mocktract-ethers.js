const BN = require('bn.js')

const hexN = n => '0x' + '0'.repeat(n)

const receipt = {
  transactionHash: hexN(64),
  transactionIndex: 0,
  blockHash: hexN(64),
  blockNumber: 0,
  gasUsed: 1,
  cumulativeGasUsed: 1,
  contractAddress: hexN(40),
  logs: [],
  status: '0x01',
  logsBloom: '0x0'
}

const regEx = {
  address: /^0x[0-9a-fA-F]{40}$/,
  arr: /^(.+?)\[([0-9]+)?\](.+)?$/,
  bytes: /^bytes([0-9]+)?$/,
  decOrHex: /^([0-9]+|0x[0-9a-fA-F]+)$/,
  num: /^(u)?int([0-9]+)?$/
}

const validators = {
  check(val, input) {
    const jtype = typeof val
    let { type } = input
    let match

    // array types
    match = type.match(regEx.arr)
    if (match) {
      const ogType = type
      if (!Array.isArray(val)) {
        throw `invalid ${type}`
      }

      type = match[1] + (match[3] || '')
      const len = +match[2] || 0

      if (len && val.length !== len) {
        throw `incorrect num elements, expected ${len}`
      }

      val.forEach((v, i) => {
        try {
          this.check(v, { ...input, type })
        } catch (err) {
          throw `invalid ${ogType} - elem ${i} not ${type}: ${err}`
        }
      })
      return
    }

    // tuple types
    if (type === 'tuple') {
      const isArr = Array.isArray(val)
      const vals = isArr ? val : Object.values(val)

      if (isArr && val.length !== input.components.length) {
        throw `struct incorrect num elements`
      } else if (vals.length > input.components.length) {
        throw `struct too many members`
      }

      vals.forEach((v, i) => {
        const c = input.components[i]
        try {
          this.check(v, c)
        } catch (err) {
          throw `invalid struct ${input.name}: ${err}`
        }
      })
      return
    }

    // number types
    match = type.match(regEx.num)
    if (match) {
      const unsigned = !!match[1]
      const n = match[2]
      this.checkIntN(val, n, unsigned)
      return
    }

    // bytes types
    match = type.match(regEx.bytes)
    if (match) {
      const size = match[1]
      this.checkBytesN(val, size)
      return
    }

    // address type
    if (type === 'address') {
      this.checkAddress(val)
      return
    }

    // bool type
    if (type === 'bool') {
      if (
        !['boolean', 'number', 'string'].includes(jtype) ||
        ![0, 1].includes(+val)
      ) {
        throw `invalid bool`
      }
      return
    }

    // string type
    if (type === 'string') {
      if (jtype !== 'string') {
        throw `invalid string`
      }
      return
    }

    throw `unknown ABI type ${type}, please submit GitHub issue`
  },

  checkAddress(val) {
    if (typeof val !== 'string' || !regEx.address.test(val)) {
      throw `invalid address`
    }
  },

  // checks if bytes string
  checkBytesN(val, n) {
    const invalid = `invalid bytes${n || ''}`
    if (typeof val !== 'string') throw invalid
    const size = n ? n * 2 : ''
    if (!new RegExp(`^0x[a-fA-F0-9]{1,${size}}$`).test(val)) throw invalid
  },

  // checks if number is within int or uint boundaries
  checkIntN(val, n = 256, unsigned) {
    const jtype = typeof val
    const invalid = `invalid ${unsigned ? 'u' : ''}int${n}`
    if (jtype !== 'string' && jtype !== 'number' && !BN.isBN(val)) throw invalid
    if (jtype === 'string' && !regEx.decOrHex.test(val)) throw invalid

    const num = new BN(val)
    const pow = new BN(unsigned ? n : n / 2)
    const max = new BN(2).pow(pow)
    const min = unsigned ? new BN(0) : max.mul(new BN(-1))

    if (num.gte(max)) throw `${invalid}: overflow`
    if (num.lt(min)) throw `${invalid}: underflow`
  }
}

const mockFunction = (item, fake) => {
  let mockReturnValue
  let mockReturnValues = []
  let mockRevert = false
  let mockRevertOnce = 0

  let mock = {
    calls: [],
    results: []
  }

  let fn = async function() {
    const args = [...arguments]
    mock.calls.push(args)

    try {
      // check num arguments
      const num = args.length
      const expectedNum = item.inputs.length
      if (num !== expectedNum) {
        const expectedMsg = `Expected ${expectedNum} got ${num}`
        throw `${item.name}: Invalid number of arguments. ${expectedMsg}`
      }

      // check arguments
      for (const i in args) {
        const arg = args[i]
        const input = item.inputs[i]
        const { name } = input

        try {
          validators.check(arg, input)
        } catch (err) {
          throw `${item.name}: arg ${i} (${name}) ${err}`
        }
      }

      if (mockRevert || mockRevertOnce) {
        if (mockRevertOnce) mockRevertOnce--
        throw Error('VM Exception while processing transaction: revert')
      }

      let output
      if (item.constant === false) {
        output = receipt
      } else if (mockReturnValues.length) {
        output = mockReturnValues.shift()
      } else if (mockReturnValue !== undefined) {
        output = mockReturnValue
      } else {
        let outputs = item.outputs.map(fake)
        output = outputs.length === 1 ? outputs[0] : outputs
      }

      mock.results.push({
        isThrow: false,
        value: output
      })

      return output
    } catch (err) {
      mock.results.push({
        isThrow: true,
        value: err
      })
      throw err
    }
  }

  fn.mock = mock

  fn.mockClear = function() {
    mock.calls = []
    mock.results = []
    return this
  }

  fn.mockReset = function() {
    mockReturnValue = undefined
    mockReturnValues = []
    return this
  }

  fn.mockReturnValue = function(val) {
    mockReturnValue = val
    return this
  }

  fn.mockReturnValueOnce = function(val) {
    mockReturnValues.push(val)
    return this
  }

  fn.mockRevert = function() {
    mockRevert = true
    return this
  }

  fn.mockRevertOnce = function() {
    mockRevertOnce++
    return this
  }

  return fn
}

function Mocktract(address, abi) {
  this.address = address
  this.estimate = {}
  this.functions = {}
  this.mocktract = true

  let mockReturnType = {}
  let mockReturnTypes = {}

  let fakeVal = {
    address: hexN(40),
    string: 'string',
    bool: true,
    // number will catch int, uint8, int256... etc
    number: new BN(1),
    bytesN: n => hexN(n * 2)
  }

  this.mockClearAll = function() {
    for (const fn of Object.values(this.functions)) {
      fn.mockClear()
    }
    return this
  }

  this.mockReset = function() {
    mockReturnType = {}
    mockReturnTypes = {}
    return this
  }

  this.mockResetAll = function() {
    this.mockReset()
    for (const fn of Object.values(this.functions)) {
      fn.mockReset()
    }
    return this
  }

  this.mockReturnType = function(type, value) {
    mockReturnType[type] = value
    return this
  }

  this.mockReturnTypeOnce = function(type, value) {
    if (!mockReturnTypes[type]) mockReturnTypes[type] = []
    mockReturnTypes[type].push(value)
    return this
  }

  const fake = output => {
    let { type } = output
    let match

    if (mockReturnTypes[type] && mockReturnTypes[type].length) {
      return mockReturnTypes[type].shift()
    } else if (mockReturnType[type] !== undefined) {
      return mockReturnType[type]
    }

    // ethers.js tuples are both arrays and object
    if (type === 'tuple') {
      let obj = []
      output.components.forEach((v, i) => {
        let fakeV = fake(v)
        obj[i] = fakeV
        obj[v.name] = fakeV
      })
      return obj
    }

    match = type.match(regEx.arr)
    if (match) {
      type = match[1] + (match[3] || '')
      const len = +match[2] || 1
      return [...Array(len)].map(() => fake({ ...output, type }))
    }

    match = type.match(regEx.num)
    if (match) {
      return fake({ type: 'number' })
    }

    match = type.match(regEx.bytes)
    if (match) {
      const size = match[1] || 1
      return fakeVal.bytesN(size)
    }

    return fakeVal[type]
  }

  abi.forEach(item => {
    if (!item.name) return

    if (item.type === 'function') {
      const fn = mockFunction(item, fake)

      this[item.name] = fn
      this.functions[item.name] = fn
      this.estimate[item.name] = () => new BN(1)
    }
  })
}

module.exports = Mocktract
