const TodoList = require('../TodoList')
const ethers = require('ethers')
// const mocktract = require('mocktract')
const mocktract = require('../..')
ethers.Contract = mocktract

describe('todo list tests', () => {
  const TL = new TodoList('address', 'wallet')

  beforeEach(() => {
    TL.contract.mockClearAll().mockResetAll()
  })

  test('getAllLists', async () => {
    TL.contract.mockReturnType('string', 'list 1')

    const lists = await TL.getAllLists()
    expect(lists).toBeInstanceOf(Array)
    expect(lists[0]).toBe('list 1')
  })

  test('getList (list exists)', async () => {
    TL.contract
      .mockReturnTypeOnce('string', 'todo 1')
      .mockReturnTypeOnce('bool', false)

    const todos = await TL.getList('exists')
    expect(todos).toBeInstanceOf(Array)
    expect(todos[0].title).toEqual('todo 1')
    expect(todos[0].done).toEqual(false)
  })

  test('getList (no such list)', async () => {
    TL.contract.getList.mockRevertOnce()

    await expect(TL.getList('nope')).rejects.toBeTruthy()
  })

  test('getListCompleted', async () => {
    TL.contract.getList.mockReturnValue([
      { title: 'todo 1', done: false },
      { title: 'todo 2', done: true },
      { title: 'todo 3', done: false },
      { title: 'todo 4', done: true },
      { title: 'todo 5', done: false }
    ])

    const completed = await TL.getListCompleted('todos')
    expect(completed).toHaveLength(2)
    expect(TL.contract.getList.mock.calls).toHaveLength(1)
  })

  test('getListIncomplete', async () => {
    TL.contract.getList.mockReturnValue([
      { title: 'todo 1', done: false },
      { title: 'todo 2', done: true },
      { title: 'todo 3', done: false },
      { title: 'todo 4', done: true },
      { title: 'todo 5', done: false }
    ])

    const incomplete = await TL.getListIncomplete('todos')
    expect(incomplete).toHaveLength(3)
    expect(TL.contract.getList.mock.calls).toHaveLength(1)
  })

  test('getTodo', async () => {
    TL.contract
      .mockReturnType('string', 'todo')
      .mockReturnTypeOnce('string', 'todo 1')
      .mockReturnTypeOnce('string', 'todo 2')
      .mockReturnTypeOnce('string', 'todo 3')

    let todo
    todo = await TL.getTodo('list', 0)
    expect(todo.title).toBe('todo 1')
    todo = await TL.getTodo('list', 1)
    expect(todo.title).toBe('todo 2')
    todo = await TL.getTodo('list', 2)
    expect(todo.title).toBe('todo 3')
    todo = await TL.getTodo('list', 3)
    expect(todo.title).toBe('todo')
  })
})
