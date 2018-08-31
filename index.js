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
  isValid(val, input) {
    const jtype = typeof val
    let { type } = input
    let match

    // array types
    match = type.match(regEx.arr)
    if (match) {
      type = match[1] + (match[3] || '')
      const len = +match[2] || 0
      if (!Array.isArray(val)) return false
      if (len && val.length !== +len) return false
      return val.every(a => this.isValid(a, { type }))
    }

    // tuple types
    if (type === 'tuple') {
      const isArr = Array.isArray(val)
      const numItems = isArr ? val.length : Object.keys(val).length
      if (numItems !== input.components.length) return false
      return input.components.every((c, i) => {
        const v = isArr ? val[i] : val[c.name]
        return this.isValid(v, c)
      })
    }

    // number types
    match = type.match(regEx.num)
    if (match) {
      const unsigned = !!match[1]
      const n = match[2]
      return this.isIntN(val, n, unsigned)
    }

    // bytes types
    match = type.match(regEx.bytes)
    if (match) {
      const size = match[1]
      return this.isBytesN(val, size)
    }

    // address type
    if (type === 'address') {
      return this.isAddress(val)
    }

    // bool type
    if (type === 'bool') {
      if (!['boolean', 'number', 'string'].includes(jtype)) return false
      return [0, 1].includes(+val)
    }

    // string type
    if (type === 'string') {
      return jtype === 'string'
    }

    return false
  },

  isAddress(val) {
    if (typeof val !== 'string') return false
    return regEx.address.test(val)
  },

  // checks if bytes string
  isBytesN(val, n) {
    if (typeof val !== 'string') return false
    const size = n ? n * 2 : ''
    return new RegExp(`^0x[a-fA-F0-9]{1,${size}}$`).test(val)
  },

  // checks if number is within int or uint boundaries
  isIntN(val, n = 256, unsigned) {
    const jtype = typeof val
    if (jtype !== 'string' && jtype !== 'number' && !BN.isBN(val)) return false
    if (jtype === 'string' && !regEx.decOrHex.test(val)) return false

    const num = new BN(val)
    const pow = new BN(unsigned ? n : n / 2)
    const max = new BN(2).pow(pow)
    const min = unsigned ? new BN(0) : max.mul(new BN(-1))

    if (num.gte(max)) return false
    if (num.lt(min)) return false
    return true
  }
}

const mockFunction = (item, fake) => {
  let mockReturnValue
  let mockReturnValues = []

  let mock = {
    calls: [],
    results: []
  }

  let fn = async function() {
    const args = [...arguments]
    mock.calls.push(args)

    try {
      // validate num arguments
      const num = args.length
      const expectedNum = item.inputs.length
      if (num !== expectedNum) {
        const expectedMsg = `Expected ${expectedNum} got ${num}`
        throw `${item.name}: Invalid number of arguments. ${expectedMsg}`
      }

      // validate arguments
      for (const i in args) {
        const arg = args[i]
        const input = item.inputs[i]
        const { name, type } = input

        if (!validators.isValid(arg, input)) {
          throw `${item.name}: Argument ${i} (${name}) expects ${type}`
        }
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

  fn.mockReturnValue = function(val) {
    mockReturnValue = val
    return this
  }

  fn.mockReturnValueOnce = function(val) {
    mockReturnValues.push(val)
    return this
  }

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

  this.mockReturnType = function(type, value) {
    mockReturnType[type] = value
    return this
  }

  this.mockReturnTypeOnce = function(type, value) {
    if (!mockReturnTypes[type]) mockReturnTypes[type] = []
    mockReturnTypes[type].push(value)
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
      return [...Array(len)].map(() => fake({ type }))
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
