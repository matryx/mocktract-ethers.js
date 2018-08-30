const BN = require('bn.js')

describe('input int tests', () => {
  test('int\tvalid', () => {
    expect(M.inputInt(1)).toBeTruthy()
    expect(M.inputInt(-1)).toBeTruthy()
    expect(M.inputInt('1')).toBeTruthy()
    expect(M.inputInt('0x1')).toBeTruthy()
  })

  test('int\tinvalid', () => {
    expect(() => M.inputInt([])).toThrow()
    expect(() => M.inputInt({})).toThrow()
    expect(() => M.inputInt('not a number')).toThrow()
    expect(() => M.inputInt('0xinvalid')).toThrow()
    expect(() => M.inputInt('0 1 2 3')).toThrow()
  })

  test('int\tvalid\tjust in bounds', () => {
    const maxInt = new BN(2).pow(new BN(128)).sub(new BN(1))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    expect(M.inputInt(maxInt)).toBeTruthy()
    expect(M.inputInt(minInt)).toBeTruthy()
  })

  test('int\tinvalid\tout of bounds', () => {
    const maxInt = new BN(2).pow(new BN(128))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    expect(() => M.inputInt(maxInt)).toThrow()
    expect(() => M.inputInt(minInt)).toThrow()
  })

  test('int8\tvalid\tjust in bounds', () => {
    const maxInt = new BN(2).pow(new BN(4)).sub(new BN(1))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    expect(M.inputInt8(maxInt)).toBeTruthy()
    expect(M.inputInt8(minInt)).toBeTruthy()
  })

  test('int8\tinvalid\tout of bounds', () => {
    const maxInt = new BN(2).pow(new BN(4))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    expect(() => M.inputInt8(maxInt)).toThrow()
    expect(() => M.inputInt8(minInt)).toThrow()
  })

  test('int32\tvalid\tjust in bounds', () => {
    const maxInt = new BN(2).pow(new BN(16)).sub(new BN(1))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    expect(M.inputInt32(maxInt)).toBeTruthy()
    expect(M.inputInt32(minInt)).toBeTruthy()
  })

  test('int32\tinvalid\tout of bounds', () => {
    const maxInt = new BN(2).pow(new BN(16))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    expect(() => M.inputInt32(maxInt)).toThrow()
    expect(() => M.inputInt32(minInt)).toThrow()
  })

  test('int256\tvalid\tjust in bounds', () => {
    const maxInt = new BN(2).pow(new BN(128)).sub(new BN(1))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    expect(M.inputInt256(maxInt)).toBeTruthy()
    expect(M.inputInt256(minInt)).toBeTruthy()
  })

  test('int256\tinvalid\tout of bounds', () => {
    const maxInt = new BN(2).pow(new BN(128))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    expect(() => M.inputInt256(maxInt)).toThrow()
    expect(() => M.inputInt256(minInt)).toThrow()
  })
})

describe('input uint tests', () => {
  test('uint\tvalid', () => {
    expect(M.inputUint(1)).toBeTruthy()
    expect(M.inputUint(0)).toBeTruthy()
    expect(M.inputInt('1')).toBeTruthy()
    expect(M.inputInt('0x0')).toBeTruthy()
  })

  test('uint\tinvalid', () => {
    expect(() => M.inputUint([])).toThrow()
    expect(() => M.inputUint({})).toThrow()
    expect(() => M.inputUint('not a number')).toThrow()
    expect(() => M.inputUint('0xinvalid')).toThrow()
    expect(() => M.inputUint('0 1 2 3')).toThrow()
  })

  test('uint\tvalid\tjust in bounds', () => {
    const maxInt = new BN(2).pow(new BN(256)).sub(new BN(1))
    expect(M.inputUint(maxInt)).toBeTruthy()
    expect(M.inputUint(0)).toBeTruthy()
  })

  test('uint\tinvalid\tout of bounds', () => {
    const maxInt = new BN(2).pow(new BN(256))
    expect(() => M.inputUint(maxInt)).toThrow()
    expect(() => M.inputUint(-1)).toThrow()
  })

  test('uint8\tvalid\tjust in bounds', () => {
    const maxInt = new BN(2).pow(new BN(8)).sub(new BN(1))
    expect(M.inputUint8(maxInt)).toBeTruthy()
    expect(M.inputUint8(0)).toBeTruthy()
  })

  test('uint8\tinvalid\tout of bounds', () => {
    const maxInt = new BN(2).pow(new BN(8))
    expect(() => M.inputUint8(maxInt)).toThrow()
    expect(() => M.inputUint8(-1)).toThrow()
  })

  test('uint32\tvalid\tjust in bounds', () => {
    const maxInt = new BN(2).pow(new BN(32)).sub(new BN(1))
    expect(M.inputUint32(maxInt)).toBeTruthy()
    expect(M.inputUint32(0)).toBeTruthy()
  })

  test('uint32\tinvalid\tout of bounds', () => {
    const maxInt = new BN(2).pow(new BN(32))
    expect(() => M.inputUint32(maxInt)).toThrow()
    expect(() => M.inputUint32(-1)).toThrow()
  })

  test('uint256\tvalid\tjust in bounds', () => {
    const maxInt = new BN(2).pow(new BN(256)).sub(new BN(1))
    expect(M.inputUint256(maxInt)).toBeTruthy()
    expect(M.inputUint256(0)).toBeTruthy()
  })

  test('uint256\tinvalid\tout of bounds', () => {
    const maxInt = new BN(2).pow(new BN(256))
    expect(() => M.inputUint256(maxInt)).toThrow()
    expect(() => M.inputUint256(-1)).toThrow()
  })
})
