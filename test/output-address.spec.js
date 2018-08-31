const addresses = [
  '0x' + '0'.repeat(40),
  '0x' + '1'.repeat(40),
  '0x' + '2'.repeat(40),
  '0x' + '3'.repeat(40)
]

describe('output address tests', () => {
  beforeEach(() => M.mockResetAll())

  test('address\tdefault', async done => {
    expect(await M.outputAddress()).toEqual(addresses[0])
    done()
  })

  test('address\tmockReturnValueOnce', async done => {
    M.outputAddress
      .mockReturnValueOnce(addresses[1])
      .mockReturnValueOnce(addresses[2])
      .mockReturnValueOnce(addresses[3])

    expect(await M.outputAddress()).toEqual(addresses[1])
    expect(await M.outputAddress()).toEqual(addresses[2])
    expect(await M.outputAddress()).toEqual(addresses[3])
    done()
  })

  test('address\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('address', addresses[3])
      .mockReturnTypeOnce('address', addresses[2])
      .mockReturnTypeOnce('address', addresses[1])

    expect(await M.outputAddress()).toEqual(addresses[3])
    expect(await M.outputAddress()).toEqual(addresses[2])
    expect(await M.outputAddress()).toEqual(addresses[1])
    done()
  })

  test('address\tmockReturnType', async done => {
    M.mockReturnType('address', addresses[1])

    expect(await M.outputAddress()).toEqual(addresses[1])
    expect(await M.outputAddress()).toEqual(addresses[1])
    expect(await M.outputAddress()).toEqual(addresses[1])
    done()
  })
})
