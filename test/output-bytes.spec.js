describe('output bytes tests', () => {
  beforeEach(() => M.mockResetAll())

  test('bytes\tdefault', async done => {
    expect(await M.outputBytes()).toEqual('0x00')
    done()
  })

  test('bytes\tmockReturnType', async done => {
    M.mockReturnType('bytes', '0xbb')

    expect(await M.outputBytes()).toEqual('0xbb')
    expect(await M.outputBytes()).toEqual('0xbb')
    expect(await M.outputBytes()).toEqual('0xbb')
    done()
  })

  test('bytes\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('bytes', '0x1')
      .mockReturnTypeOnce('bytes', '0x22')
      .mockReturnTypeOnce('bytes', '0x333')

    expect(await M.outputBytes()).toEqual('0x1')
    expect(await M.outputBytes()).toEqual('0x22')
    expect(await M.outputBytes()).toEqual('0x333')
    done()
  })

  test('bytes1\tdefault', async done => {
    expect(await M.outputBytes1()).toEqual('0x00')
    done()
  })

  test('bytes1\tmockReturnType', async done => {
    M.mockReturnType('bytes1', '0xbb')

    expect(await M.outputBytes1()).toEqual('0xbb')
    expect(await M.outputBytes1()).toEqual('0xbb')
    expect(await M.outputBytes1()).toEqual('0xbb')
    done()
  })

  test('bytes1\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('bytes1', '0x11')
      .mockReturnTypeOnce('bytes1', '0x22')
      .mockReturnTypeOnce('bytes1', '0x33')

    expect(await M.outputBytes1()).toEqual('0x11')
    expect(await M.outputBytes1()).toEqual('0x22')
    expect(await M.outputBytes1()).toEqual('0x33')
    done()
  })

  test('bytes4\tdefault', async done => {
    expect(await M.outputBytes4()).toEqual('0x00000000')
    done()
  })

  test('bytes4\tmockReturnType', async done => {
    M.mockReturnType('bytes4', '0xbbbbbbbb')

    expect(await M.outputBytes4()).toEqual('0xbbbbbbbb')
    expect(await M.outputBytes4()).toEqual('0xbbbbbbbb')
    expect(await M.outputBytes4()).toEqual('0xbbbbbbbb')
    done()
  })

  test('bytes4\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('bytes4', '0x11111111')
      .mockReturnTypeOnce('bytes4', '0x22222222')
      .mockReturnTypeOnce('bytes4', '0x33333333')

    expect(await M.outputBytes4()).toEqual('0x11111111')
    expect(await M.outputBytes4()).toEqual('0x22222222')
    expect(await M.outputBytes4()).toEqual('0x33333333')
    done()
  })
})

describe('output string tests', () => {
  test('string\tdefault', async done => {
    expect(await M.outputString()).toEqual('string')
    done()
  })

  test('string\tmockReturnType', async done => {
    M.mockReturnType('string', 'hodor')

    expect(await M.outputString()).toEqual('hodor')
    expect(await M.outputString()).toEqual('hodor')
    expect(await M.outputString()).toEqual('hodor')
    done()
  })

  test('string\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('string', 'hold')
      .mockReturnTypeOnce('string', 'the')
      .mockReturnTypeOnce('string', 'door')

    expect(await M.outputString()).toEqual('hold')
    expect(await M.outputString()).toEqual('the')
    expect(await M.outputString()).toEqual('door')
    done()
  })
})
