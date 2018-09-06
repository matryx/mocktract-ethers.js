const ethers = require('ethers')
const TodoListArtifact = require('./build/contracts/TodoList')
const TodoList = require('./TodoList')

const networkID = 4447
const address = TodoListArtifact.networks[networkID].address

// provider and private key for `truffle develop`
const provider = new ethers.providers.JsonRpcProvider('http://localhost:9545')
const key = '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3'
const wallet = new ethers.Wallet(key, provider)

async function main() {
  const TL = new TodoList(address, wallet)
  await TL.createList('groceries')

  await TL.createTodo('groceries', { title: 'avocado' })
  await TL.createTodo('groceries', { title: 'lettuce' })
  await TL.createTodo('groceries', { title: 'tomatos' })
  await TL.createTodo('groceries', { title: 'bread' })

  await TL.completeTodo('groceries', 0) // got my avocado
  await TL.completeTodo('groceries', 2) // got my tomatos

  console.log(await TL.getAllLists())
  console.log(await TL.getList('groceries'))
  console.log(await TL.getListCompleted('groceries'))
  console.log(await TL.getListIncomplete('groceries'))
}

main()
