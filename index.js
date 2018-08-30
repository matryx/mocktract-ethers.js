const BN = require('bn.js')

const regEx = {
  address: /^0x[0-9a-fA-F]{40}$/,
  arr: /^(.+?)\[([0-9]+)\](.+)?$/,
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
      const len = +match[2]
      if (!Array.isArray(val)) return false
      if (len && val.length !== +len) return false
      return val.every(a => this.isValid(a, type))
    }

    // tuple types
    if (type === 'tuple') {
      const isArr = Array.isArray(val)
      return input.components.every((c, i) => {
        const v = isArr ? val[i] : val[c.name]
        return this.isValid(v, c.type)
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

    // default check against js types
    return jtype === type
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

function Mocktract(address, abi) {
  this.address = address
  this.estimate = {}
  this.functions = {}
  this.mocktract = true

  let mockReturnType = {}
  let mockReturnTypes = {}

  let fakeVal = {
    address: '0x' + '0'.repeat(40),
    string: 'string',
    bool: true,
    // number will catch int, uint8, int256... etc
    number: new BN(1),
    bytesN: n => '0x' + '0'.repeat(n)
  }

  this.mockReturnType = (type, value) => {
    mockReturnType[type] = value
  }
  this.mockReturnTypeOnce = (type, value) => {
    if (!mockReturnTypes[type]) mockReturnTypes[type] = []
    mockReturnTypes[type].push(value)
  }

  const fake = output => {
    let { type } = output
    let match

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
      const len = +match[2]
      return new Array(len).fill(fake({ type }))
    }

    if (mockReturnTypes[type] && mockReturnTypes[type].length) {
      return mockReturnTypes[type].pop()
    } else if (mockReturnType[type]) {
      return mockReturnType[type]
    }

    match = type.match(regEx.num)
    if (match) {
      return fake({ type: 'number' })
    }

    match = type.match(bytes32)
    if (match) {
      const size = match[1]
      return fakeVal.bytesN(size)
    }

    return fakeVal[type]
  }

  abi.forEach(item => {
    if (!item.name) return

    if (item.type === 'function') {
      let mockReturnValue
      let mockReturnValues = []

      let fn = function() {
        const args = [...arguments]

        // validate num arguments
        const num = args.length
        const num_expect = item.inputs.length
        if (num !== num_expect) {
          const expected = `Expected ${num_expect} got ${num}`
          throw new Error(
            `${item.name}: Invalid number of arguments. ${expected}`
          )
        }

        // validate arguments
        for (const i in args) {
          const arg = args[i]
          const input = item.inputs[i]
          const { name, type } = input

          if (!validators.isValid(arg, input)) {
            throw new Error(
              `${item.name}: Argument ${i} (${name}) expects ${type}`
            )
          }
        }

        if (mockReturnValues.length) {
          return mockReturnValues.pop()
        } else if (mockReturnValue !== undefined) {
          return mockReturnValue
        } else {
          let output = item.outputs.map(fake)
          return output.length === 1 ? output[0] : output
        }
      }

      fn.mockReturnValue = val => {
        mockReturnValue = val
      }
      fn.mockReturnValueOnce = val => {
        mockReturnValues.push(val)
      }

      this[item.name] = fn
      this.functions[item.name] = fn
      this.estimate[item.name] = () => new BN(1)
    }
  })
}

module.exports = Mocktract
