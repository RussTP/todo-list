import { format, compareAsc } from "date-fns";
import { Todo } from "./todo.js";


 class Project {
    
    constructor(){
        this.todos = [];
    }
    addTodo(title, description, priority, complete = false) {
        const newTodo = new Todo(title, description, priority.value, complete);
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
    
    addChecklist(id, newItem) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            const todo  = this.todos[index];
            todo.checklist.push(newItem);
            return newItem;
        }
        return null;  

    }
        date(id, newDate) {
        const index = this.todos.findIndex(todo => todo.id ===id);
        if (index !== -1) {
        const todo = this.todos[index];
        const parsedDate = new Date(newDate);
        todo.date.push(newDate);
        todo.date.sort(compareAsc);
        format(todo.date[0], "MM/dd/yyyy");
        return todo;

        }
    return null;
    }
   

}

export default Project;