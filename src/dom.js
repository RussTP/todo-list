import Project from "./project.js";
import { format } from "date-fns";
export class Display {
    constructor() {
        this.project = new Project();
    }
       addProject() {
        const content = document.querySelector("#form-container");
        const wrapper =  document.createElement("div");
        wrapper.id ="project-form";
        wrapper.innerHTML = ` 
        <form id="project-form">
        <label for ="title">Project title:</label>
        <input type="text" id="title" name="title">
        <label for ="description">Description:</label>
        <input type="text" id="description" name="descripton">
        <label for="priority">Priority 0-5</label>
        <input type="range" id="priority" name="priority" min="0" max="5">
        <label for="task">Task:</label>
        <input type="text" id="task" name="task">
        <label for="date">Due date:</label>
        <input type="date" id="due-date" name="due-date">
        <input type="submit" id="submit" value="Submit">
    </form>`;
        content.appendChild(wrapper);

        
        const form = wrapper.querySelector("#project-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const title = form.querySelector("#title").value;
            const description = form.querySelector("#description").value;
            const priority = form.querySelector("#priority").value;
            const task = form.querySelector("#task").value;
            const date = form.querySelector("#due-date").value;
            const newTodo = this.project.addTodo(title, description, priority, date);

            if(task) {
                this.project.addTask(newTodo.id, task);
            }
            console.log("Current todos:", this.project.todos);
            wrapper.remove();
            this.displayProject();
            document.querySelector("#add-project-btn").disabled = false;
             });
        }

        displayProject() {
            const content = document.querySelector("#project-container");
            content.innerHTML = "<h1>My Projects</h1>";
            
            this.project.todos.forEach(todo => {
                const projectCard = document.createElement("div");
                projectCard.classList.add("project-card");

            const dueDateText = todo.date.length > 0
            ? format(todo.date[0], "MM/dd/yyyy")
            : "No date set";
            
        
            projectCard.innerHTML = `
            <h3>${todo.title}</h3>
            <p>${todo.description}</p>
            <p>Priority: ${todo.priority}</p>
            <p>Task: ${todo.task}</p>
            <p>Due: ${dueDateText}</p>
             `;
             content.appendChild(projectCard);
          })};

 


    }

