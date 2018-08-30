/*
  struct Thing {
    int i;
    uint u;
    bytes1 b;
  }

  struct Nested {
    int i;
    Thing t;
  }
 */

const arrayify = obj => {
  let arr = Object.values(obj)
  return arr.map(item => {
    const isObj = typeof item === 'object'
    return isObj ? arrayify(item) : item
  })
}

const validThing = {
  i: -1,
  u: 1,
  b: '0xbb'
}
const invalidThing = {
  i: -1,
  u: 1,
  b: '0xbb',
  x: 'x'
}
const validArrThing = arrayify(validThing)
const invalidArrThing = arrayify(invalidThing)

const validNested = {
  i: -1,
  t: validThing
}
const invalidNested = {
  i: -1,
  t: invalidThing
}
const validArrNested = arrayify(validNested)
const invalidArrNested = arrayify(invalidNested)

describe('input struct tests', () => {
  test('struct Thing obj\tvalid', () => {
    expect(M.inputStructThing(validThing)).toBeTruthy()
  })

  test('struct Thing arr\tvalid', () => {
    expect(M.inputStructThing(validArrThing)).toBeTruthy()
  })

  test('struct Thing obj\tinvalid', () => {
    expect(() => M.inputStructThing(invalidThing)).toThrow()
  })

  test('struct Thing arr\tinvalid', () => {
    expect(() => M.inputStructThing(invalidArrThing)).toThrow()
  })

  test('struct Nested obj\tvalid', () => {
    expect(M.inputStructNested(validNested)).toBeTruthy()
  })

  test('struct Nested arr\tvalid', () => {
    expect(M.inputStructNested(validArrNested)).toBeTruthy()
  })

  test('struct Nested obj\tinvalid', () => {
    expect(() => M.inputStructNested(invalidNested)).toThrow()
  })

  test('struct Nested arr\tinvalid', () => {
    expect(() => M.inputStructNested(invalidArrNested)).toThrow()
  })
})
