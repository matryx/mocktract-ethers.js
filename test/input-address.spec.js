const validAddresses = [
  '0x0123456789012345678901234567890123456789',
  '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
  '0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD'
]

describe('input address tests', () => {
  test('address\tvalid', async done => {
    await expect(M.inputAddress(validAddresses[0])).resolves.toBeTruthy()
    await expect(M.inputAddress(validAddresses[1])).resolves.toBeTruthy()
    await expect(M.inputAddress(validAddresses[2])).resolves.toBeTruthy()
    done()
  })

  test('address\tinvalid', async done => {
    await expect(M.inputAddress(0)).rejects.toBeTruthy()
    await expect(M.inputAddress([])).rejects.toBeTruthy()
    await expect(M.inputAddress({})).rejects.toBeTruthy()
    await expect(M.inputAddress('0x0')).rejects.toBeTruthy()
    await expect(M.inputAddress('invalid')).rejects.toBeTruthy()
    await expect(M.inputAddress('0x01234567890123456789')).rejects.toBeTruthy()

    const tooLong = '0x0123456789012345678901234567890123456789a'
    await expect(M.inputAddress(tooLong)).rejects.toBeTruthy()
    done()
  })
})
