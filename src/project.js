export default class Project {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.todos = [];
    console.log("New project created:", this.title, "with ID:", this.id);
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