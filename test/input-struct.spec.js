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
  test('struct Thing obj\tvalid', async done => {
    await expect(M.inputStructThing(validThing)).resolves.toBeTruthy()
    done()
  })

  test('struct Thing arr\tvalid', async done => {
    await expect(M.inputStructThing(validArrThing)).resolves.toBeTruthy()
    done()
  })

  test('struct Thing obj\tinvalid', async done => {
    await expect(M.inputStructThing(invalidThing)).rejects.toBeTruthy()
    done()
  })

  test('struct Thing arr\tinvalid', async done => {
    await expect(M.inputStructThing(invalidArrThing)).rejects.toBeTruthy()
    done()
  })

  test('struct Nested obj\tvalid', async done => {
    await expect(M.inputStructNested(validNested)).resolves.toBeTruthy()
    done()
  })

  test('struct Nested arr\tvalid', async done => {
    await expect(M.inputStructNested(validArrNested)).resolves.toBeTruthy()
    done()
  })

  test('struct Nested obj\tinvalid', async done => {
    await expect(M.inputStructNested(invalidNested)).rejects.toBeTruthy()
    done()
  })

  test('struct Nested arr\tinvalid', async done => {
    await expect(M.inputStructNested(invalidArrNested)).rejects.toBeTruthy()
    done()
  })
})
