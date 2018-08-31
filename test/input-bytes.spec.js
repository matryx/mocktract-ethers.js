describe('input bytes tests', () => {
  test('bytes\tvalid', async done => {
    await expect(M.inputBytes('0x0123456789abcdef')).resolves.toBeTruthy()
    await expect(M.inputBytes('0x0123456789ABCDEF')).resolves.toBeTruthy()
    done()
  })

  test('bytes\tinvalid', async done => {
    await expect(M.inputBytes(0)).rejects.toBeTruthy()
    await expect(M.inputBytes([])).rejects.toBeTruthy()
    await expect(M.inputBytes({})).rejects.toBeTruthy()
    await expect(M.inputBytes('INVALID')).rejects.toBeTruthy()
    await expect(M.inputBytes('0xINVALID')).rejects.toBeTruthy()
    done()
  })

  test('bytes1\tvalid', async done => {
    await expect(M.inputBytes1('0x0')).resolves.toBeTruthy()
    await expect(M.inputBytes1('0xff')).resolves.toBeTruthy()
    await expect(M.inputBytes1('0xFF')).resolves.toBeTruthy()
    done()
  })

  test('bytes1\tinvalid', async done => {
    await expect(M.inputBytes1('0x000')).rejects.toBeTruthy()
    await expect(M.inputBytes1('0xffff')).rejects.toBeTruthy()
    await expect(M.inputBytes1('0xDEADBEEF')).rejects.toBeTruthy()
    done()
  })

  test('bytes4\tvalid', async done => {
    await expect(M.inputBytes4('0x0')).resolves.toBeTruthy()
    await expect(M.inputBytes4('0xdeadbeef')).resolves.toBeTruthy()
    await expect(M.inputBytes4('0x7AC07AC0')).resolves.toBeTruthy()
    done()
  })

  test('bytes4\tinvalid', async done => {
    await expect(M.inputBytes4('0x000000000')).rejects.toBeTruthy()
    await expect(M.inputBytes4('0xfffffffff')).rejects.toBeTruthy()
    await expect(M.inputBytes4('0xDEADBEEFF')).rejects.toBeTruthy()
    done()
  })

  test('bytes32\tvalid', async done => {
    await expect(M.inputBytes32('0x0')).resolves.toBeTruthy()
    await expect(M.inputBytes32('0xdeadbeef')).resolves.toBeTruthy()
    await expect(M.inputBytes32('0x' + '7AC0'.repeat(16))).resolves.toBeTruthy()
    done()
  })

  test('bytes32\tinvalid', async done => {
    await expect(M.inputBytes32('0x' + '0'.repeat(65))).rejects.toBeTruthy()
    done()
  })
})

describe('input string tests', () => {
  test('string\tvalid', async done => {
    await expect(M.inputString('trololololo')).resolves.toBeTruthy()
    await expect(M.inputString('hey, look, a string')).resolves.toBeTruthy()
    await expect(M.inputString('taco '.repeat(100))).resolves.toBeTruthy()
    done()
  })

  test('string\tinvalid', async done => {
    await expect(M.inputString(0)).rejects.toBeTruthy()
    await expect(M.inputString([])).rejects.toBeTruthy()
    await expect(M.inputString({})).rejects.toBeTruthy()
    done()
  })
})
