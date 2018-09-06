const ethers = require('ethers')
const TodoListArtifact = require('./build/contracts/TodoList')

module.exports = class TodoList {
  constructor(address, wallet) {
    this.contract = new ethers.Contract(address, TodoListArtifact.abi, wallet)
  }

  createList(listName) {
    return this.contract.createList(listName).catch(() => {
      throw `Error creating list ${listName}`
    })
  }

  createTodo(listName, newTodo) {
    return this.contract.createTodo(listName, newTodo).catch(() => {
      throw `Error creating todo on ${listName}`
    })
  }

  completeTodo(listName, index) {
    return this.contract.completeTodo(listName, index).catch(() => {
      throw `Error marking todo ${index} as completed on ${listName}`
    })
  }

  getAllLists() {
    return this.contract.getAllLists().catch(() => {
      throw `Error getting all lists`
    })
  }

  getList(listName) {
    return this.contract.getList(listName).catch(() => {
      throw `Error getting list ${listName}`
    })
  }

  getTodo(listName, index) {
    return this.contract.getTodo(listName, index).catch(() => {
      throw `Error getting todo ${index} on list ${listName}`
    })
  }

  async getListCompleted(listName) {
    const todos = await this.getList(listName)
    return todos.filter(t => t.done)
  }

  async getListIncomplete(listName) {
    const todos = await this.getList(listName)
    return todos.filter(t => !t.done)
  }

  async getListCompletedCount(listName) {
    const completed = await this.getListCompleted(listName)
    return completed.length
  }

  async getListIncompleteCount(listName) {
    const incomplete = await this.getListIncomplete(listName)
    return incomplete.length
  }
}
