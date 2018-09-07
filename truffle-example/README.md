# mocktract truffle-example

This folder is an example `truffle` project and node contract interface that is unit tested with `mocktract`.

Inside this folder:

- `index.js`: Example usage of the `TodoList.js` smart contract interface class
- `TodoList.js`: Example JavaScript interface class to the `TodoList` smart contract
- `contracts/TodoList.sol`: Example Ethereum smart contract for creating todo lists and todos.
- `test/TodoList.test.js`: Example unit tests for the `TodoList.js` interface class using `mocktract`

## Getting Started

Install `truffle-example` dependencies:

```bash
cd truffle-example
npm install
```

Install `truffle` cli tool:

```bash
npm install -g truffle
```

## Basic Usage

Enter into the `truffle` development console:

```bash
truffle develop
```

Compile and migrate `TodoList`:

```bash
truffle(develop)> migrate --reset
```

In a new prompt, test `index.js`:

```bash
cd truffle-example
node index.js
```

The output should be:

```bash
[ 'groceries' ]
[ [ 'avocado', true, title: 'avocado', done: true ],
  [ 'lettuce', false, title: 'lettuce', done: false ],
  [ 'tomatos', true, title: 'tomatos', done: true ],
  [ 'bread', false, title: 'bread', done: false ] ]
[ [ 'avocado', true, title: 'avocado', done: true ],
  [ 'tomatos', true, title: 'tomatos', done: true ] ]
[ [ 'lettuce', false, title: 'lettuce', done: false ],
  [ 'bread', false, title: 'bread', done: false ] ]
```

## Mocktract Example

Once the `TodoList` has been compiled by `truffle`, you can run run the `mocktract` tests with:

```bash
cd truffle-example
npm run test
```
