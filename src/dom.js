import Project from "./project.js";

export class Display {
    constructor() {
        this.project = new Project();
    }
       addProject() {
        const content = document.querySelector("#project-container");
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
        <label for="date">Due date:</label>
        <input type="date" id="date" name="date">
        <input type="submit" id="submit" value="Submit">
    </form>`;
        content.appendChild(wrapper);

        const form = wrapper.querySelector("#project-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const title = form.querySelector("#title").value;
            const description = form.querySelector("#description").value;
            const priority = form.querySelector("#priority").value;
            const date = form.querySelector("#date").value;
            this.project.addTodo(title, description, priority, date);

            console.log("Current todos:", this.project.todos);
            form.reset();
             });
        }

    };

