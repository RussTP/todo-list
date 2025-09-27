
import { format, isValid } from "date-fns";


export class Display {
  constructor(controller) {
    this.controller = controller;
    this.expandedProjects = new Set();
  }

  toggleExpanded(projectId) {
    if (this.expandedProjects.has(projectId)) {
      this.expandedProjects.delete(projectId);
    }else {
      this.expandedProjects.add(projectId);
    }
    const card = document.querySelector(`#project-${projectId}`);
    const container = card?.querySelector(".todos-container");
    container?.classList.toggle("show");
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
       console.log("🔎 Rendering project", project.title, "with ID:", project.id);
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");
      projectCard.id = `project-${project.id}`;
      projectCard.innerHTML = `<h2>Project-${project.title}</h2>`;

      

      const collapseTodoBtn = document.createElement("button");
      collapseTodoBtn.textContent = "--"
      collapseTodoBtn.id ="collapse-btn";
      collapseTodoBtn.addEventListener("click", () => {
        this.controller.collapseTodo(project.id)
        });
      projectCard.appendChild(collapseTodoBtn);

      const addTodoBtn = document.createElement("button");
      addTodoBtn.textContent = "Add Todo";
      addTodoBtn.addEventListener("click", () => {
        this.controller.todoForm(project.id)
          
      });
      console.log("Add todo clicked for projects:", project.id);
      projectCard.appendChild(addTodoBtn);


      const projectComplete = document.createElement("button");
      projectComplete.textContent = project.completed ? "Incomplete" : "Complete";
      projectComplete.addEventListener("click", () => 
      this.controller.toggleProjectComplete(project.id));
      projectCard.appendChild(projectComplete);


      const removeProjectBtn = document.createElement("button");
      removeProjectBtn.textContent = "Remove Project";
      removeProjectBtn.addEventListener("click", () => this.controller.removeProject(project.id)); 
      console.log("Remove project clicked", project.id);
      projectCard.appendChild(removeProjectBtn);

      const todosContainer = document.createElement("div");
      todosContainer.classList.add("todos-container");
      if(this.expandedProjects.has(project.id)) {
        todosContainer.classList.add("show");
      }

      project.todos.forEach(todo => {
      console.log("   ↳ Rendering todo:", todo.title, "ID:", todo.id);
        const todoEl = document.createElement("div");
        todoEl.classList.add("todo");

        let dueDateText = todo.date instanceof Date && isValid(todo.date)
          ? format(todo.date, "MM/dd/yyyy")
          : "No date set";
          console.log("todo.date type:", typeof todo.date, todo.date);
          console.log("is instance of Date:", todo.date instanceof Date);

        const priorityClass = priorityColors[todo.priority] || "priority-low";
        const completedClass = todo.completed ? "completed" : "";
        todoEl.innerHTML = `<span class="priority-indicator ${priorityClass}"></span>
      <span class="${completedClass}">
        <b>Todo:</b> ${todo.title} 
        <b>Description:</b> ${todo.description} 
        <b>Due:</b> (${dueDateText})
     </span>
    `;

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = todo.completed ? "Undo" : "Complete";
        toggleBtn.addEventListener("click", () => {
          this.controller.toggleComplete(project.id, todo.id);
      });
        todoEl.appendChild(toggleBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
          this.controller.removeTodo(project.id, todo.id); 
          });
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
      item.dataset.projectId = project.id;
      projectListEl.appendChild(item);

      item.addEventListener("click", () => {
        this.controller.collapseTodo(project.id);
      });
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
     toggleBtn.parentElement.classList.toggle("open");
    } 
  });
}

displayCompleteProjectNav(projects) {
  const projectListEl = document.querySelector("#complete-project-list");
  if (!projectListEl) return;

  projectListEl.innerHTML = "";
  projects
  .filter(p => p.completed)
  .forEach(project => {
    const item = document.createElement("div");
    item.classList.add("my-project");
    item.textContent = project.title;
    item.dataset.projectId = project.id;
    item.addEventListener("click", () => {
      this.controller.collapseTodo(project.id);
    });
    projectListEl.appendChild(item);
  });
}

completeProjectNavToggle() {
  const toggleBtn = document.querySelector("#complete-projects-btn");
    console.log("toggleBtn project complete found:", toggleBtn);
    if(!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
      console.log("complete-projects-btn clicked");
      const projectListEl = document.querySelector("#complete-project-list");
      if (projectListEl) {
        projectListEl.classList.toggle("show");
        toggleBtn.parentElement.classList.toggle("open");
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
        <label for="todo"><p>Todo:</p></label>
        <input type="text" id="todo" name="todo" required>
        <label for="description"><p>Description:</p></label>
        <input type="text" id="description" name="description" required>
        <label for="priority"><p>Priority:</p></label>
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
    overlay.addEventListener("click", event => { if(event.target === overlay) overlay.remove(); 

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