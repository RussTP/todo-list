import "./styles.css";
import  Project from "./project.js";
import { Display } from "./dom.js";



const displayForm = new Display()
document
 .querySelector("#add-project-btn")
 .addEventListener("click", () => {
    displayForm.addProject();
 });





const project = new Project();
const todo1 = project.addTodo("Todo task", "a description", "high", false);
project.addTask(todo1.id, "subtask 1");
project.addTask(todo1.id, "subtask 2");
project.dueDate(todo1.id, "2025-08-30");

console.log(todo1);
console.log(project.todos[0].date);
