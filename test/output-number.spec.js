describe('output int tests', () => {
  beforeEach(() => M.mockResetAll())

  test('int\tdefault', async done => {
    expect(+(await M.outputInt())).toEqual(1)
    done()
  })

  test('int\tmockReturnType', async done => {
    M.mockReturnType('int', 2)

    expect(await M.outputInt()).toEqual(2)
    expect(await M.outputInt()).toEqual(2)
    expect(await M.outputInt()).toEqual(2)
    done()
  })

  test('int\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('int', 1)
      .mockReturnTypeOnce('int', 2)
      .mockReturnTypeOnce('int', 3)

    expect(await M.outputInt()).toEqual(1)
    expect(await M.outputInt()).toEqual(2)
    expect(await M.outputInt()).toEqual(3)
    done()
  })

  test('int8\tdefault', async done => {
    expect(+(await M.outputInt8())).toEqual(1)
    done()
  })

  test('int8\tmockReturnType', async done => {
    M.mockReturnType('int8', 2)

    expect(await M.outputInt8()).toEqual(2)
    expect(await M.outputInt8()).toEqual(2)
    expect(await M.outputInt8()).toEqual(2)
    done()
  })

  test('int8\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('int8', 1)
      .mockReturnTypeOnce('int8', 2)
      .mockReturnTypeOnce('int8', 3)

    expect(await M.outputInt8()).toEqual(1)
    expect(await M.outputInt8()).toEqual(2)
    expect(await M.outputInt8()).toEqual(3)
    done()
  })

  test('int32\tdefault', async done => {
    expect(+(await M.outputInt32())).toEqual(1)
    done()
  })

  test('int32\tmockReturnType', async done => {
    M.mockReturnType('int32', 2)

    expect(await M.outputInt32()).toEqual(2)
    expect(await M.outputInt32()).toEqual(2)
    expect(await M.outputInt32()).toEqual(2)
    done()
  })

  test('int32\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('int32', 1)
      .mockReturnTypeOnce('int32', 2)
      .mockReturnTypeOnce('int32', 3)

    expect(await M.outputInt32()).toEqual(1)
    expect(await M.outputInt32()).toEqual(2)
    expect(await M.outputInt32()).toEqual(3)
    done()
  })

  test('int256\tdefault', async done => {
    expect(+(await M.outputInt256())).toEqual(1)
    done()
  })

  test('int256\tmockReturnType', async done => {
    M.mockReturnType('int256', 2)

    expect(await M.outputInt256()).toEqual(2)
    expect(await M.outputInt256()).toEqual(2)
    expect(await M.outputInt256()).toEqual(2)
    done()
  })

  test('int256\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('int256', 1)
      .mockReturnTypeOnce('int256', 2)
      .mockReturnTypeOnce('int256', 3)

    expect(await M.outputInt256()).toEqual(1)
    expect(await M.outputInt256()).toEqual(2)
    expect(await M.outputInt256()).toEqual(3)
    done()
  })
})

describe('output uint tests', () => {
  test('uint\tdefault', async done => {
    expect(+(await M.outputUint())).toEqual(1)
    done()
  })

  test('uint\tmockReturnType', async done => {
    M.mockReturnType('uint', 2)

    expect(await M.outputUint()).toEqual(2)
    expect(await M.outputUint()).toEqual(2)
    expect(await M.outputUint()).toEqual(2)
    done()
  })

  test('uint\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('uint', 1)
      .mockReturnTypeOnce('uint', 2)
      .mockReturnTypeOnce('uint', 3)

    expect(await M.outputUint()).toEqual(1)
    expect(await M.outputUint()).toEqual(2)
    expect(await M.outputUint()).toEqual(3)
    done()
  })

  test('uint8\tdefault', async done => {
    expect(+(await M.outputUint8())).toEqual(1)
    done()
  })

  test('uint8\tmockReturnType', async done => {
    M.mockReturnType('uint8', 2)

    expect(await M.outputUint8()).toEqual(2)
    expect(await M.outputUint8()).toEqual(2)
    expect(await M.outputUint8()).toEqual(2)
    done()
  })

  test('uint8\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('uint8', 1)
      .mockReturnTypeOnce('uint8', 2)
      .mockReturnTypeOnce('uint8', 3)

    expect(await M.outputUint8()).toEqual(1)
    expect(await M.outputUint8()).toEqual(2)
    expect(await M.outputUint8()).toEqual(3)
    done()
  })

  test('uint32\tdefault', async done => {
    expect(+(await M.outputUint32())).toEqual(1)
    done()
  })

  test('uint32\tmockReturnType', async done => {
    M.mockReturnType('uint32', 2)

    expect(await M.outputUint32()).toEqual(2)
    expect(await M.outputUint32()).toEqual(2)
    expect(await M.outputUint32()).toEqual(2)
    done()
  })

  test('uint32\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('uint32', 1)
      .mockReturnTypeOnce('uint32', 2)
      .mockReturnTypeOnce('uint32', 3)

    expect(await M.outputUint32()).toEqual(1)
    expect(await M.outputUint32()).toEqual(2)
    expect(await M.outputUint32()).toEqual(3)
    done()
  })

  test('uint256\tdefault', async done => {
    expect(+(await M.outputUint256())).toEqual(1)
    done()
  })

  test('uint256\tmockReturnType', async done => {
    M.mockReturnType('uint256', 2)

    expect(await M.outputUint256()).toEqual(2)
    expect(await M.outputUint256()).toEqual(2)
    expect(await M.outputUint256()).toEqual(2)
    done()
  })

  test('uint256\tmockReturnTypeOnce', async done => {
    M.mockReturnTypeOnce('uint256', 1)
      .mockReturnTypeOnce('uint256', 2)
      .mockReturnTypeOnce('uint256', 3)

    expect(await M.outputUint256()).toEqual(1)
    expect(await M.outputUint256()).toEqual(2)
    expect(await M.outputUint256()).toEqual(3)
    done()
  })
})
