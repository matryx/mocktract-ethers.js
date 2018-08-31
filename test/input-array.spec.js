describe('input array tests', () => {
  test('int[]\tvalid', async done => {
    await expect(M.inputIntArr([])).resolves.toBeTruthy()
    await expect(M.inputIntArr([0, 1, 2])).resolves.toBeTruthy()
    await expect(M.inputIntArr(['0', '1', '2'])).resolves.toBeTruthy()
    await expect(M.inputIntArr(['0x0', '0x1', '0x2'])).resolves.toBeTruthy()
    done()
  })

  test('int[]\tinvalid', async done => {
    await expect(M.inputIntArr({})).rejects.toBeTruthy()
    await expect(M.inputIntArr('nope')).rejects.toBeTruthy()
    await expect(M.inputIntArr([0, 'a'])).rejects.toBeTruthy()
    done()
  })

  test('int[3]\tvalid', async done => {
    await expect(M.inputIntArr3([0, 1, 2])).resolves.toBeTruthy()
    await expect(M.inputIntArr3(['0', '1', '2'])).resolves.toBeTruthy()
    await expect(M.inputIntArr3(['0x0', '0x1', '0x2'])).resolves.toBeTruthy()
    done()
  })

  test('int[3]\tinvalid', async done => {
    await expect(M.inputIntArr3([])).rejects.toBeTruthy()
    await expect(M.inputIntArr3([0, 1])).rejects.toBeTruthy()
    await expect(M.inputIntArr3([0, 1, 2, 3])).rejects.toBeTruthy()
    done()
  })
})

describe('input nested array tests', () => {
  test('int[][]\tvalid', async done => {
    await expect(M.inputIntArrIntArr([])).resolves.toBeTruthy()
    await expect(M.inputIntArrIntArr([[], []])).resolves.toBeTruthy()
    await expect(M.inputIntArrIntArr([[0], [1, 2, 3]])).resolves.toBeTruthy()
    done()
  })

  test('int[][]\tinvalid', async done => {
    await expect(M.inputIntArrIntArr([{}])).rejects.toBeTruthy()
    await expect(M.inputIntArrIntArr([['a'], []])).rejects.toBeTruthy()
    await expect(M.inputIntArrIntArr([[0], '[1, 2, 3]'])).rejects.toBeTruthy()
    done()
  })

  test('int[][2]\tvalid', async done => {
    await expect(M.inputIntArrIntArr2([])).resolves.toBeTruthy()
    await expect(M.inputIntArrIntArr2([[0, 1]])).resolves.toBeTruthy()
    await expect(M.inputIntArrIntArr2([[0, 1], [2, 3]])).resolves.toBeTruthy()
    done()
  })

  test('int[][2]\tinvalid', async done => {
    await expect(M.inputIntArrIntArr2([[0]])).rejects.toBeTruthy()
    await expect(M.inputIntArrIntArr2([[0, 1, 2]])).rejects.toBeTruthy()
    await expect(M.inputIntArrIntArr2([[0, 1], '[2]'])).rejects.toBeTruthy()
    done()
  })

  test('int[2][]\tvalid', async done => {
    await expect(M.inputIntArr2IntArr([[], []])).resolves.toBeTruthy()
    await expect(M.inputIntArr2IntArr([[], [0, 1, 2]])).resolves.toBeTruthy()
    done()
  })

  test('int[2][]\tinvalid', async done => {
    await expect(M.inputIntArr2IntArr([])).rejects.toBeTruthy()
    await expect(M.inputIntArr2IntArr([[]])).rejects.toBeTruthy()
    await expect(M.inputIntArr2IntArr([[0], [1], [2]])).rejects.toBeTruthy()
    await expect(M.inputIntArr2IntArr([[0], '[1, 2, 3]'])).rejects.toBeTruthy()
    done()
  })

  test('int[2][2]\tvalid', async done => {
    await expect(M.inputIntArr2IntArr2([[0, 1], [2, 3]])).resolves.toBeTruthy()
    done()
  })

  test('int[2][2]\tinvalid', async done => {
    await expect(M.inputIntArr2IntArr2([])).rejects.toBeTruthy()
    await expect(M.inputIntArr2IntArr2([[0], [1]])).rejects.toBeTruthy()
    await expect(M.inputIntArr2IntArr2([[0], '[1, 2, 3]'])).rejects.toBeTruthy()
    done()
  })
})
