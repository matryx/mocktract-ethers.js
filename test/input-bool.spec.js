describe('input bool tests', () => {
  test('bool\tvalid', () => {
    expect(M.inputBool(true)).toBeTruthy()
    expect(M.inputBool(false)).toBeTruthy()
    expect(M.inputBool(0)).toBeTruthy()
    expect(M.inputBool(1)).toBeTruthy()
    expect(M.inputBool('0')).toBeTruthy()
    expect(M.inputBool('1')).toBeTruthy()
  })

  test('bool\tinvalid', () => {
    expect(() => M.inputBool('not a bool')).toThrow()
    expect(() => M.inputBool([])).toThrow()
    expect(() => M.inputBool({})).toThrow()
    expect(() => M.inputBool(2)).toThrow()
  })
})
