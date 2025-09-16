import { Todo } from "./todo.js";
import { Display } from "./dom.js";



 class Project {
    
    constructor(){
        this.todos = [];
    }

    addTodo(title, description, priority, date) {
  const newTodo = new Todo(title, description, priority, false, date);
  this.todos.push(newTodo);
  return newTodo;
}


    removeTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            const [removedTodo] = this.todos.splice(index, 1);
            return removedTodo;
        }
        return null;
    }

    addTask(projectId, taskName) {
        const project = this.todos.find((p) => p.id == projectId);
        if (project) {
            project.tasks.push(taskName);
        }
    }
 }

export default Project;