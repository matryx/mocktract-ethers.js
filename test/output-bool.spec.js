describe('output bool tests', () => {
  beforeEach(() => M.mockResetAll())

  test('bool\tdefault', async done => {
    expect(await M.outputBool()).toEqual(true)
    done()
  })

  test('bool\tmockReturnType', async done => {
    M.mockReturnType('bool', false)

    expect(await M.outputBool()).toEqual(false)
    expect(await M.outputBool()).toEqual(false)
    expect(await M.outputBool()).toEqual(false)
    done()
  })

  test('bool\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('bool', true)
      .mockReturnTypeOnce('bool', false)
      .mockReturnTypeOnce('bool', true)

    expect(await M.outputBool()).toEqual(true)
    expect(await M.outputBool()).toEqual(false)
    expect(await M.outputBool()).toEqual(true)
    done()
  })
})
