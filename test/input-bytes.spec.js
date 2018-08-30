describe('input bytes tests', () => {
  test('bytes\tvalid', () => {
    expect(M.inputBytes('0x0123456789abcdef')).toBeTruthy()
    expect(M.inputBytes('0x0123456789ABCDEF')).toBeTruthy()
  })

  test('bytes\tinvalid', () => {
    expect(() => M.inputBytes(0)).toThrow()
    expect(() => M.inputBytes([])).toThrow()
    expect(() => M.inputBytes({})).toThrow()
    expect(() => M.inputBytes('INVALID')).toThrow()
    expect(() => M.inputBytes('0xINVALID')).toThrow()
  })

  test('bytes1\tvalid', () => {
    expect(M.inputBytes1('0x0')).toBeTruthy()
    expect(M.inputBytes1('0xff')).toBeTruthy()
    expect(M.inputBytes1('0xFF')).toBeTruthy()
  })

  test('bytes1\tinvalid', () => {
    expect(() => M.inputBytes1('0x000')).toThrow()
    expect(() => M.inputBytes1('0xffff')).toThrow()
    expect(() => M.inputBytes1('0xDEADBEEF')).toThrow()
  })

  test('bytes4\tvalid', () => {
    expect(M.inputBytes4('0x0')).toBeTruthy()
    expect(M.inputBytes4('0xdeadbeef')).toBeTruthy()
    expect(M.inputBytes4('0x7AC07AC0')).toBeTruthy()
  })

  test('bytes4\tinvalid', () => {
    expect(() => M.inputBytes4('0x000000000')).toThrow()
    expect(() => M.inputBytes4('0xfffffffff')).toThrow()
    expect(() => M.inputBytes4('0xDEADBEEFF')).toThrow()
  })

  test('bytes32\tvalid', () => {
    expect(M.inputBytes32('0x0')).toBeTruthy()
    expect(M.inputBytes32('0xdeadbeef')).toBeTruthy()
    expect(M.inputBytes32('0x' + '7AC0'.repeat(16))).toBeTruthy()
  })

  test('bytes32\tinvalid', () => {
    expect(() => M.inputBytes32('0x' + '0'.repeat(65))).toThrow()
  })
})

describe('input string tests', () => {
  test('string\tvalid', () => {
    expect(M.inputString('trololololo')).toBeTruthy()
    expect(M.inputString('hey, look, a string')).toBeTruthy()
    expect(M.inputString('taco '.repeat(100))).toBeTruthy()
  })

  test('string\tinvalid', () => {
    expect(() => M.inputString(0)).toThrow()
    expect(() => M.inputString([])).toThrow()
    expect(() => M.inputString({})).toThrow()
  })
})
