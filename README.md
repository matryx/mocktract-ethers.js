# mocktract-ethers.js

A library for mocking ethers.js Contracts for unit testing. `mocktract` takes in an address and ABI, and builds out a mock contract that matches an `ethers.Contract`. Inspired by `jest.fn()`, `mocktract` adds many value mocking options like `fn.mockReturnValue(value)` or `contract.mockReturnType(type, value)`. This is for the Ethereum Smart Contract ethers.js framework.

## Getting Started

Install `mocktract` using `npm`:

```bash
npm install --save-dev matryx/mocktract-ethers.js
```

Or via `yarn`:

```bash
yarn add --dev matryx/mocktract-ethers.js
```

## Basic Usage

The `mocktract` constructor mimics the first two parameters of `ethers.Contract`, to make swapping out easy. To swap out `ethers.Contract` with `mocktract` in a test file:

```js
const ethers = require('ethers')
const mocktract = require('mocktract')
ethers.Contract = mocktract
```

Now wherever the contract is used, `mocktract` can be used to mock return values for specific functions or types.

## Example Test With Truffle and Jest

The folder `truffle-example` gives an example of a TodoList ethereum smart contract with Truffle, and how `mocktract` can be used for unit testing a node interface to the contract.

These are some excerpts from the example:

```js
// TodoList.js

const ethers = require('ethers')
const TodoListArtifact = require('./build/contracts/TodoList.json')

module.exports = class TodoList {
  constructor(address, wallet) {
    this.contract = new ethers.Contract(address, TodoListArtifact.abi, wallet)
  }

  // ...
}
```

```js
// TodoList.test.js

const TodoList = require('../TodoList')
const ethers = require('ethers')
const mocktract = require('mocktract')
ethers.Contract = mocktract

describe('todo list tests', () => {
  const TL = new TodoList('address', 'wallet')

  // ...

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

  // ...
})
```

## Documentation

### `mocktract.mockClearAll()`

`mockClearAll` calls `mockClear` on all of the `mocktract`'s functions.

### `mocktract.mockReset()`

`mockReset` removes any mocked return types set with `mockReturnType` and `mockReturnTypeOnce`.

### `mocktract.mockResetAll()`

`mockResetAll` does everything `mocktract.mockReset()` does, and also calls `fn.mockReset` on all of the `mocktract`'s functions.

### `mocktract.mockReturnType(type, value)`

`mockReturnType` accepts a `type` and `value` that will be returned whenever `mocktract` needs to mock a value of type `type`.

```js
M.mockReturnType('int8', 42)
await M.getInt8() // 42
await M.getInt8() // 42
await M.getInt8() // 42
```

### `mocktract.mockReturnTypeOnce(type, value)`

`mockReturnTypeOnce` accepts a `type` and `value` that will be returned the next time that `mocktract` needs to mock a value of type `type`. Can be chained so that successive mocks for `type` return different values. When there are no more `mockReturnTypeOnce` values to use, calls will return the default.

```js
M.mockReturnType('string', 'default')
  .mockReturnTypeOnce('string', 'hello')
  .mockReturnTypeOnce('string', 'world')

await M.getString() // 'hello'
await M.getString() // 'world'
await M.getString() // 'default'
```

### `mocktract.fn.mock.calls`

`fn.mock.calls` is an array containing the call arguments of all calls that have been made to `fn`.

```js
await M.addInts(3, 10)
await M.addInts(7, 6)
await M.addInts(13, 0)
M.addInts.mock.calls // [[3, 10], [7, 6], [13, 0]]
```

### `mocktract.fn.mock.results`

`fn.mock.results` is an array containing the results of all calls that have been made to `fn`. Each entry is an object containing a boolean `isThrow` property, and a `value` property. `isThrow` is true if the call resulted in a `throw`, or false if the call returned normally. The `value` property contains the value that was thrown or returned.

```js
// ex. getArrayItem reverts if index < 10
await M.getArrayItem(3)
await M.getArrayItem(13)
M.addInts.mock.results
/*
  [
    {
      isThrow: false,
      value: 1
    },
    {
      isThrow: true,
      value: Error('VM Exception while processing transaction: revert')
    }
  ]
*/
```

### `mocktract.fn.mockClear()`

`fn.mockClear` resets all information stored in `fn.mock.calls` and `fn.mock.results`

### `mocktract.fn.mockReset()`

`fn.mockReset` does everything `fn.mockClear()` does, and also removes any mocked return values.

### `mocktract.fn.mockReturnValue(value)`

`fn.mockReturnValue(value)` accepts a `value` that will be returned whenever `fn` is called.

```js
M.getString.mockReturnValue('party')
await M.getString() // party
await M.getString() // party
await M.getString() // party
```

### `mocktract.fn.mockReturnValueOnce(value)`

`fn.mockReturnValueOnce(value)` accepts a `value` that will be returned the next `fn` is called. Can be chained so that successive calls to `fn` return different values. When there are no more `mockReturnValueOnce` values to use, calls will return the default.

```js
M.getString
  .mockReturnValue('not hot dog')
  .mockReturnValueOnce('hot dog')
  .mockReturnValueOnce('maybe hot dog')

await M.getString() // 'hot dog'
await M.getString() // 'maybe hot dog'
await M.getString() // 'not hot dog'
```

### `mocktract.fn.mockRevert()`

`fn.mockRevert` will cause any call to `fn` to fail with the error `VM Exception while processing transaction: revert`.

```js
M.doSomethingCool.mockRevert()
await M.doSomethingCool() // throws Error('VM Exception while processing transaction: revert')
```

### `mocktract.fn.mockRevertOnce()`

`fn.mockRevert` will cause the nextcall to `fn` to fail with the error `VM Exception while processing transaction: revert`. Can be chained so that successive calls to `fn` also revert.

```js
M.doSomethingCool.mockRevertOnce()
await M.doSomethingCool() // throws Error('VM Exception while processing transaction: revert')
await M.doSomethingCool() // succeeds
```
