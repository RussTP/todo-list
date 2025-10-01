export default class Project {
  constructor(title, completed = false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.todos = [];
    this.completed = completed;

  }

  addTodo(todo) {
  this.todos.push(todo);
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