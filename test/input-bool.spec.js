describe('input bool tests', () => {
  test('bool\tvalid', async done => {
    await expect(M.inputBool(true)).resolves.toBeTruthy()
    await expect(M.inputBool(false)).resolves.toBeTruthy()
    await expect(M.inputBool(0)).resolves.toBeTruthy()
    await expect(M.inputBool(1)).resolves.toBeTruthy()
    await expect(M.inputBool('0')).resolves.toBeTruthy()
    await expect(M.inputBool('1')).resolves.toBeTruthy()
    done()
  })

  test('bool\tinvalid', async done => {
    await expect(M.inputBool('not a bool')).rejects.toBeTruthy()
    await expect(M.inputBool([])).rejects.toBeTruthy()
    await expect(M.inputBool({})).rejects.toBeTruthy()
    await expect(M.inputBool(2)).rejects.toBeTruthy()
    done()
  })
})
