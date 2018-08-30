describe('input array tests', () => {
  test('int[]\tvalid', () => {
    expect(M.inputIntArr([])).toBeTruthy()
    expect(M.inputIntArr([0, 1, 2, 3])).toBeTruthy()
    expect(M.inputIntArr(['0', '1', '2', '3'])).toBeTruthy()
    expect(M.inputIntArr(['0x0', '0x1', '0x2', '0x3'])).toBeTruthy()
  })

  test('int[]\tinvalid', () => {
    expect(() => M.inputIntArr({})).toThrow()
    expect(() => M.inputIntArr('nope')).toThrow()
    expect(() => M.inputIntArr([0, 'a'])).toThrow()
  })

  test('int[3]\tvalid', () => {
    expect(M.inputIntArr3([0, 1, 2])).toBeTruthy()
    expect(M.inputIntArr3(['0', '1', '2'])).toBeTruthy()
    expect(M.inputIntArr3(['0x0', '0x1', '0x2'])).toBeTruthy()
  })

  test('int[3]\tinvalid', () => {
    expect(() => M.inputIntArr3([])).toThrow()
    expect(() => M.inputIntArr3([0, 1])).toThrow()
    expect(() => M.inputIntArr3([0, 1, 2, 3])).toThrow()
  })
})

describe('input nested array tests', () => {
  test('int[][]\tvalid', () => {
    expect(M.inputIntArrIntArr([])).toBeTruthy()
    expect(M.inputIntArrIntArr([[], []])).toBeTruthy()
    expect(M.inputIntArrIntArr([[0], [1, 2, 3]])).toBeTruthy()
  })

  test('int[][]\tinvalid', () => {
    expect(() => M.inputIntArrIntArr([{}])).toThrow()
    expect(() => M.inputIntArrIntArr([['a'], []])).toThrow()
    expect(() => M.inputIntArrIntArr([[0], '[1, 2, 3]'])).toThrow()
  })

  test('int[][2]\tvalid', () => {
    expect(M.inputIntArrIntArr2([])).toBeTruthy()
    expect(M.inputIntArrIntArr2([[0, 1]])).toBeTruthy()
    expect(M.inputIntArrIntArr2([[0, 1], [2, 3], [4, 5]])).toBeTruthy()
  })

  test('int[][2]\tinvalid', () => {
    expect(() => M.inputIntArrIntArr2([[0]])).toThrow()
    expect(() => M.inputIntArrIntArr2([[0, 1, 2]])).toThrow()
    expect(() => M.inputIntArrIntArr2([[0, 1], '[2, 3, 4]'])).toThrow()
  })

  test('int[2][]\tvalid', () => {
    expect(M.inputIntArr2IntArr([[], []])).toBeTruthy()
    expect(M.inputIntArr2IntArr([[], [0, 1, 2]])).toBeTruthy()
  })

  test('int[2][]\tinvalid', () => {
    expect(() => M.inputIntArr2IntArr([])).toThrow()
    expect(() => M.inputIntArr2IntArr([[]])).toThrow()
    expect(() => M.inputIntArr2IntArr([[0], [1], [2]])).toThrow()
    expect(() => M.inputIntArr2IntArr([[0], '[1, 2, 3]'])).toThrow()
  })

  test('int[2][2]\tvalid', () => {
    expect(M.inputIntArr2IntArr2([[0, 1], [2, 3]])).toBeTruthy()
  })

  test('int[2][2]\tinvalid', () => {
    expect(() => M.inputIntArr2IntArr2([])).toThrow()
    expect(() => M.inputIntArr2IntArr2([[0], [1]])).toThrow()
    expect(() => M.inputIntArr2IntArr2([[0], '[1, 2, 3]'])).toThrow()
  })
})
