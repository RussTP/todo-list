
import { format, isValid } from "date-fns";


export class Display {
  constructor(controller) {
    this.controller = controller;
  }

  projectForm() {
    console.log("projectForm called");
    const content = document.querySelector("#form-container");
    console.log("form container element:", content);
    
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    overlay.innerHTML = `
      <form class="modal-form">
        <label for="title">Project title:</label>
        <input type="text" id="title" name="title" required>
        <input type="submit" value="Submit">
        <button type="button" id="cancelBtn">Cancel</button>
      </form>
    `;
    content.appendChild(overlay);
    overlay.style.display = "flex";

    overlay.querySelector("#cancelBtn").addEventListener("click", () => overlay.remove());
    console.log("Project form cancelled");
    overlay.addEventListener("click", event => { if(event.target === overlay) overlay.remove(); 

    });

    const form = overlay.querySelector(".modal-form");
    form.addEventListener("submit", e => {
      e.preventDefault();
      const title = form.querySelector("#title").value;
      console.log("Form submitted, title:", title);
      this.controller.createProject(title);
      overlay.remove();
    });
  }

  displayProjects(projects) {

        const priorityColors= {
        low: "priority-low",
        medium: "priority-medium",
        high: "priority-high"
      };

    console.log("displayProjects called with projects", projects);
    const content = document.querySelector("#project-container");
    content.innerHTML = "<h1>My Projects</h1>";

    projects.forEach(project => {
      console.log("rendering project:", project);
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");
      projectCard.id = `project-${project.id}`;
      projectCard.innerHTML = `<h3>Project-${project.title}</h3>`;

      const collapseTodoBtn = document.createElement("button");
      collapseTodoBtn.textContent = "--";
      collapseTodoBtn.addEventListener("click", () => this.controller.collapseTodo(project.id));
      console.log("collapse todo", project.id)
      projectCard.appendChild(collapseTodoBtn);

      const addTodoBtn = document.createElement("button");
      addTodoBtn.textContent = "Add Todo";
      addTodoBtn.addEventListener("click", () => this.controller.todoForm(project.id));
      console.log("Add todo clicked for projects:", project.id);
      projectCard.appendChild(addTodoBtn);

      const removeProjectBtn = document.createElement("button");
      removeProjectBtn.textContent = "Remove Project";
      removeProjectBtn.addEventListener("click", () => this.controller.removeProject(project.id)); 
      console.log("Remove project clicked", project.id);
      projectCard.appendChild(removeProjectBtn);

      const todosContainer = document.createElement("div");
      todosContainer.classList.add("todos-container");

      project.todos.forEach(todo => {
        console.log("Rendering todo:", todo);

        const todoEl = document.createElement("div");
        todoEl.classList.add("todo");



        let dueDateText = todo.date instanceof Date && isValid(todo.date)
          ? format(todo.date, "MM/dd/yyyy")
          : "No date set";
          console.log("todo.date type:", typeof todo.date, todo.date);
          console.log("is instance of Date:", todo.date instanceof Date);

    

        const priorityClass = priorityColors[todo.priority] || "priority-low";
        todoEl.innerHTML = `<span class="priority-indicator ${priorityClass}"></span>
        <span style="text-decoration:${todo.completed ? "line-through" : "none"}">
          <b>Todo:</b> <titleTodo contenteditable="true">${todo.title} </titleTodo> <b>Description:</b><todo desc contenteditable="true">${todo.description}</todo desc> <b>Due:</b> (${dueDateText}) 
        </span>`;

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = todo.completed ? "Undo" : "Complete";
        toggleBtn.addEventListener("click", () => this.controller.toggleComplete(project.id, todo.id));
        todoEl.appendChild(toggleBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => this.controller.removeTodo(project.id, todo.id));
        todoEl.appendChild(deleteBtn);

        todosContainer.appendChild(todoEl);
      });

      projectCard.appendChild(todosContainer);
      content.appendChild(projectCard);
    });
  }


  displayProjectNav(projects) {
    const projectListEl = document.querySelector("#project-list");
    if(!projectListEl) return; 
    
projectListEl.innerHTML = "";
projects.forEach(project => {
      const item = document.createElement("div");
      item.classList.add("my-project");
      item.textContent = project.title;
      projectListEl.appendChild(item);
      });
}

projectNavToggle() {
  const toggleBtn = document.querySelector("#my-projects-btn");
    console.log("toggleBtn found:", toggleBtn);
  if(!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    console.log("my-projects-btn clicked");    
    const projectListEl = document.querySelector("#project-list");
    if (projectListEl) {
    projectListEl.classList.toggle("show");
    } 
  });
}
  todoForm(projectId) {
    console.log("todoForm called for projectId:", projectId);
    const projectCard = document.querySelector(`#project-${projectId}`);
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    overlay.innerHTML = `
      <form class="modal-form">
        <label for="todo">Todo:</label>
        <input type="text" id="todo" name="todo" required>
        <label for="description">Description:</label>
        <input type="text" id="description" name="description" required>
        <label for="priority">Priority:</label>
        <select id="priority" name="priority">
         <option value ="low">Low</option>
         <option value ="medium">Medium</option>
         <option value ="high">High</option>
        </select>
        <label for="date">Due Date:</label>
        <input type="date" id="date" name="date" required>
        
        <input type="submit" value="Submit">
        <button type="button" id="cancelBtn">Cancel</button>
      </form>
    `;
    projectCard.appendChild(overlay);
    overlay.style.display = "flex";

    overlay.querySelector("#cancelBtn").addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", e => { if(e.target === overlay) overlay.remove(); 

    });

    const form = overlay.querySelector(".modal-form");
    form.addEventListener("submit", event => {
      event.preventDefault();
      const todoName = form.querySelector("#todo").value;
      const description = form.querySelector("#description").value;
      const priority = form.querySelector("#priority").value;
      const dateValue = form.querySelector("#date").value;
      if (!todoName) return;
      this.controller.addTodo(projectId, {
        title: todoName,
        description,
         priority,
        date: dateValue || null
      });

      console.log("Todo form submitted:", todoName, priority, dateValue);
      overlay.remove();
    });
  }
}
