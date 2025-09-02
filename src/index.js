import "./styles.css";
import  Project from "./project.js";
import { Display } from "./dom.js";


const display = new Display()
 document
 .querySelector("#add-project-btn")
 .addEventListener("click", () => {
    display.addProject();
 });
  





const project = new Project();
const todo1 = project.addTodo("Todo task", "a description", "high", false);
project.addChecklist(todo1.id, "subtask 1");
project.addChecklist(todo1.id, "subtask 2");
project.date(todo1.id, "2025-08-30");

console.log(todo1);
console.log(project.todos[0].date);

