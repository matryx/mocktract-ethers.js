const BN = require('bn.js')

describe('input int tests', () => {
  test('int\tvalid', async done => {
    await expect(M.inputInt(1)).resolves.toBeTruthy()
    await expect(M.inputInt(-1)).resolves.toBeTruthy()
    await expect(M.inputInt('1')).resolves.toBeTruthy()
    await expect(M.inputInt('0x1')).resolves.toBeTruthy()
    done()
  })

  test('int\tinvalid', async done => {
    await expect(M.inputInt([])).rejects.toBeTruthy()
    await expect(M.inputInt({})).rejects.toBeTruthy()
    await expect(M.inputInt('not a number')).rejects.toBeTruthy()
    await expect(M.inputInt('0xinvalid')).rejects.toBeTruthy()
    await expect(M.inputInt('0 1 2 3')).rejects.toBeTruthy()
    done()
  })

  test('int\tvalid\tjust in bounds', async done => {
    const maxInt = new BN(2).pow(new BN(128)).sub(new BN(1))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    await expect(M.inputInt(maxInt)).resolves.toBeTruthy()
    await expect(M.inputInt(minInt)).resolves.toBeTruthy()
    done()
  })

  test('int\tinvalid\tout of bounds', async done => {
    const maxInt = new BN(2).pow(new BN(128))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    await expect(M.inputInt(maxInt)).rejects.toBeTruthy()
    await expect(M.inputInt(minInt)).rejects.toBeTruthy()
    done()
  })

  test('int8\tvalid\tjust in bounds', async done => {
    const maxInt = new BN(2).pow(new BN(4)).sub(new BN(1))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    await expect(M.inputInt8(maxInt)).resolves.toBeTruthy()
    await expect(M.inputInt8(minInt)).resolves.toBeTruthy()
    done()
  })

  test('int8\tinvalid\tout of bounds', async done => {
    const maxInt = new BN(2).pow(new BN(4))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    await expect(M.inputInt8(maxInt)).rejects.toBeTruthy()
    await expect(M.inputInt8(minInt)).rejects.toBeTruthy()
    done()
  })

  test('int32\tvalid\tjust in bounds', async done => {
    const maxInt = new BN(2).pow(new BN(16)).sub(new BN(1))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    await expect(M.inputInt32(maxInt)).resolves.toBeTruthy()
    await expect(M.inputInt32(minInt)).resolves.toBeTruthy()
    done()
  })

  test('int32\tinvalid\tout of bounds', async done => {
    const maxInt = new BN(2).pow(new BN(16))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    await expect(M.inputInt32(maxInt)).rejects.toBeTruthy()
    await expect(M.inputInt32(minInt)).rejects.toBeTruthy()
    done()
  })

  test('int256\tvalid\tjust in bounds', async done => {
    const maxInt = new BN(2).pow(new BN(128)).sub(new BN(1))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    await expect(M.inputInt256(maxInt)).resolves.toBeTruthy()
    await expect(M.inputInt256(minInt)).resolves.toBeTruthy()
    done()
  })

  test('int256\tinvalid\tout of bounds', async done => {
    const maxInt = new BN(2).pow(new BN(128))
    const minInt = maxInt.mul(new BN(-1)).sub(new BN(1))
    await expect(M.inputInt256(maxInt)).rejects.toBeTruthy()
    await expect(M.inputInt256(minInt)).rejects.toBeTruthy()
    done()
  })
})

describe('input uint tests', () => {
  test('uint\tvalid', async done => {
    await expect(M.inputUint(1)).resolves.toBeTruthy()
    await expect(M.inputUint(0)).resolves.toBeTruthy()
    await expect(M.inputInt('1')).resolves.toBeTruthy()
    await expect(M.inputInt('0x0')).resolves.toBeTruthy()
    done()
  })

  test('uint\tinvalid', async done => {
    await expect(M.inputUint([])).rejects.toBeTruthy()
    await expect(M.inputUint({})).rejects.toBeTruthy()
    await expect(M.inputUint('not a number')).rejects.toBeTruthy()
    await expect(M.inputUint('0xinvalid')).rejects.toBeTruthy()
    await expect(M.inputUint('0 1 2 3')).rejects.toBeTruthy()
    done()
  })

  test('uint\tvalid\tjust in bounds', async done => {
    const maxInt = new BN(2).pow(new BN(256)).sub(new BN(1))
    await expect(M.inputUint(maxInt)).resolves.toBeTruthy()
    await expect(M.inputUint(0)).resolves.toBeTruthy()
    done()
  })

  test('uint\tinvalid\tout of bounds', async done => {
    const maxInt = new BN(2).pow(new BN(256))
    await expect(M.inputUint(maxInt)).rejects.toBeTruthy()
    await expect(M.inputUint(-1)).rejects.toBeTruthy()
    done()
  })

  test('uint8\tvalid\tjust in bounds', async done => {
    const maxInt = new BN(2).pow(new BN(8)).sub(new BN(1))
    await expect(M.inputUint8(maxInt)).resolves.toBeTruthy()
    await expect(M.inputUint8(0)).resolves.toBeTruthy()
    done()
  })

  test('uint8\tinvalid\tout of bounds', async done => {
    const maxInt = new BN(2).pow(new BN(8))
    await expect(M.inputUint8(maxInt)).rejects.toBeTruthy()
    await expect(M.inputUint8(-1)).rejects.toBeTruthy()
    done()
  })

  test('uint32\tvalid\tjust in bounds', async done => {
    const maxInt = new BN(2).pow(new BN(32)).sub(new BN(1))
    await expect(M.inputUint32(maxInt)).resolves.toBeTruthy()
    await expect(M.inputUint32(0)).resolves.toBeTruthy()
    done()
  })

  test('uint32\tinvalid\tout of bounds', async done => {
    const maxInt = new BN(2).pow(new BN(32))
    await expect(M.inputUint32(maxInt)).rejects.toBeTruthy()
    await expect(M.inputUint32(-1)).rejects.toBeTruthy()
    done()
  })

  test('uint256\tvalid\tjust in bounds', async done => {
    const maxInt = new BN(2).pow(new BN(256)).sub(new BN(1))
    await expect(M.inputUint256(maxInt)).resolves.toBeTruthy()
    await expect(M.inputUint256(0)).resolves.toBeTruthy()
    done()
  })

  test('uint256\tinvalid\tout of bounds', async done => {
    const maxInt = new BN(2).pow(new BN(256))
    await expect(M.inputUint256(maxInt)).rejects.toBeTruthy()
    await expect(M.inputUint256(-1)).rejects.toBeTruthy()
    done()
  })
})
