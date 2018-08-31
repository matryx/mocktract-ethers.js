const arrays = [[1], [2, 3], [4, 5, 6]]

describe('output array tests', () => {
  beforeEach(() => M.mockResetAll())

  test('int[]\tdefault', async done => {
    expect((await M.outputIntArr()).toString()).toEqual('1')
    done()
  })

  test('int[]\tmockReturnValueOnce', async done => {
    M.outputIntArr
      .mockReturnValueOnce(arrays[1])
      .mockReturnValueOnce(arrays[2])
      .mockReturnValueOnce(arrays[3])

    expect(await M.outputIntArr()).toEqual(arrays[1])
    expect(await M.outputIntArr()).toEqual(arrays[2])
    expect(await M.outputIntArr()).toEqual(arrays[3])
    done()
  })

  test('int[]\tmockReturnType', async done => {
    M.mockReturnType('int[]', arrays[1])

    expect(await M.outputIntArr()).toEqual(arrays[1])
    expect(await M.outputIntArr()).toEqual(arrays[1])
    expect(await M.outputIntArr()).toEqual(arrays[1])
    done()
  })

  test('int[]\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('int[]', arrays[3])
      .mockReturnTypeOnce('int[]', arrays[2])
      .mockReturnTypeOnce('int[]', arrays[1])

    expect(await M.outputIntArr()).toEqual(arrays[3])
    expect(await M.outputIntArr()).toEqual(arrays[2])
    expect(await M.outputIntArr()).toEqual(arrays[1])
    done()
  })

  test('int[2]\tdefault', async done => {
    expect((await M.outputIntArr2()).toString()).toEqual('1,1')
    done()
  })

  test('int[2]\tmockReturnType int', async done => {
    M.mockReturnType('int', 3)

    expect(await M.outputIntArr2()).toEqual([3, 3])
    expect(await M.outputIntArr2()).toEqual([3, 3])
    done()
  })

  test('int[2]\tmockReturnTypeOnce int', async done => {
    M.mockReset()
      .mockReturnTypeOnce('int', 1)
      .mockReturnTypeOnce('int', 2)
      .mockReturnTypeOnce('int', 3)
      .mockReturnTypeOnce('int', 4)

    expect(await M.outputIntArr2()).toEqual([1, 2])
    expect(await M.outputIntArr2()).toEqual([3, 4])
    done()
  })
})

describe('output nested array tests', () => {
  beforeEach(() => M.mockResetAll())

  test('int[2][2]\tmockReturnTypeOnce int', async done => {
    M.mockReturnTypeOnce('int', 1)
      .mockReturnTypeOnce('int', 2)
      .mockReturnTypeOnce('int', 3)
      .mockReturnTypeOnce('int', 4)

    expect(await M.outputIntArr2IntArr2()).toEqual([[1, 2], [3, 4]])
    done()
  })

  test('int[2][2]\tmockReturnTypeOnce int', async done => {
    M.mockReturnTypeOnce('int', 1)
      .mockReturnTypeOnce('int', 2)
      .mockReturnTypeOnce('int', 3)
      .mockReturnTypeOnce('int', 4)

    expect(await M.outputIntArr2IntArr2()).toEqual([[1, 2], [3, 4]])
    done()
  })

  test('int[2][2]\tmockReturnTypeOnce int[2]', async done => {
    M.mockReturnTypeOnce('int[2]', [3, 3]).mockReturnTypeOnce('int[2]', [7, 7])

    expect(await M.outputIntArr2IntArr2()).toEqual([[3, 3], [7, 7]])
    done()
  })
})
