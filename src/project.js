import {  compareAsc, parseISO } from "date-fns";
import { Todo } from "./todo.js";
import { Display } from "./dom.js";



 class Project {
    
    constructor(){
        this.todos = [];
    }
    addTodo(title, description, priority, dateString) {
        const todo = new Todo(title, description, priority, false);
        if (dateString) {
            const parsed = parseISO(dateString);
            todo.date.push(parsed);
    }
    this.todos.push(todo);
    return todo;
}

    removeTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            const [removedTodo] = this.todos.splice(index, 1);
            return removedTodo;
        }
        return null;
    }

    addTask(id, newItem) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            const todo  = this.todos[index];
            todo.task.push(newItem);
            return newItem;
        }
        return null;  

    }
        dueDate(id, newDateString) {
        const index = this.todos.findIndex(todo => todo.id ===id);
        if (index !== -1) {
        const todo = this.todos[index];
        const parsedDate = parseISO(newDateString);
        todo.date.push(parsedDate);
        todo.date.sort(compareAsc);
        return todo;
        }
    return null;
    }
}

export default Project;