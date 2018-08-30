describe('input address tests', () => {
  test('address\tvalid', () => {
    expect(
      M.inputAddress('0x0123456789012345678901234567890123456789')
    ).toBeTruthy()
    expect(
      M.inputAddress('0xabcdefabcdefabcdefabcdefabcdefabcdefabcd')
    ).toBeTruthy()
    expect(
      M.inputAddress('0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD')
    ).toBeTruthy()
  })

  test('address\tinvalid', () => {
    expect(() => M.inputAddress(0)).toThrow()
    expect(() => M.inputAddress([])).toThrow()
    expect(() => M.inputAddress({})).toThrow()
    expect(() => M.inputAddress('0x0')).toThrow()
    expect(() => M.inputAddress('invalid')).toThrow()
    expect(() =>
      M.inputAddress('0x0123456789012345678901234567890123456789a')
    ).toThrow()
    expect(() =>
      M.inputAddress('0x012345678901234567890123456789012345678')
    ).toThrow()
  })
})
