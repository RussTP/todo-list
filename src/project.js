import  Todo  from "./todo.js";

export default class Project {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.todos = [];
  }

  addTodo(todo) {
    if (todo instanceof Todo) {
  this.todos.push(todo);
  } else {
    throw new Error("Can only add Todo objects to a Project");
    }
  }
  removeTodo(id) {
    const index = this.todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      const [removedTodo] = this.todos.splice(index, 1);
      return removedTodo;
    }
    return null;
  }
}