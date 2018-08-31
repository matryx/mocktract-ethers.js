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

describe('output struct tests', () => {
  beforeEach(() => M.mockResetAll())

  test('struct Thing\tdefault', async done => {
    let thing = await M.outputStructThing()
    expect(+thing.i).toEqual(1)
    expect(+thing.u).toEqual(1)
    expect(thing.b).toEqual('0x00')
    done()
  })

  test('struct Thing\tmockReturnType members', async done => {
    M.mockReturnType('int', 3)
      .mockReturnType('uint', 7)
      .mockReturnType('bytes1', '0xbb')

    let thing = await M.outputStructThing()
    expect(thing.i).toEqual(3)
    expect(thing.u).toEqual(7)
    expect(thing.b).toEqual('0xbb')
    done()
  })

  test('struct Nested\tdefault', async done => {
    let nested = await M.outputStructNested()
    expect(+nested.i).toEqual(1)
    expect(+nested.t.i).toEqual(1)
    expect(+nested.t.u).toEqual(1)
    expect(nested.t.b).toEqual('0x00')
    done()
  })

  test('struct Nested\tmockReturnType members', async done => {
    M.mockReturnType('int', 3)
      .mockReturnType('uint', 7)
      .mockReturnType('bytes1', '0xbb')

    let nested = await M.outputStructNested()
    expect(nested.i).toEqual(3)
    expect(nested.t.i).toEqual(3)
    expect(nested.t.u).toEqual(7)
    expect(nested.t.b).toEqual('0xbb')
    done()
  })
})
