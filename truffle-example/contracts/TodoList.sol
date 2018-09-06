pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

contract TodoList {
    struct Todo {
        string title;
        bool done;
    }

    struct List {
        Todo[] todos;
        bool exists;
    }

    mapping(string=>List) lists;
    string[] allLists;

    modifier listExists(string listName) {
        require(lists[listName].exists, "list not found");
        _;
    }

    function createList(string listName) public {
        require(!lists[listName].exists, "list already exists");
        allLists.push(listName);
        lists[listName].exists = true;
    }

    function createTodo(string listName, Todo newTodo) public listExists(listName) {
        lists[listName].todos.push(newTodo);
    }

    function completeTodo(string listName, uint256 index) public listExists(listName) {
        lists[listName].todos[index].done = true;
    }

    function getAllLists() public view returns(string[] _allLists) {
        return allLists;
    }

    function getList(string listName) public view listExists(listName) returns(Todo[] _todoList) {
        return lists[listName].todos;
    }

    function getTodo(string listName, uint256 index) public view listExists(listName) returns(Todo _todo) {
        require(index < lists[listName].todos.length, "index out of bounds");
        return lists[listName].todos[index];
    }
}
