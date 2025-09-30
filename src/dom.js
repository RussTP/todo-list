
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

  
  sideNavMobile(){

  const navBurger = document.querySelector("#nav-burger");
  const hamburger = document.querySelector(".hamburger");
  const closeBtn = document.querySelector(".closebtn");


  if (!navBurger || !hamburger || !closeBtn) return;


  hamburger.addEventListener("click", () => {
      console.log("☰ clicked");
    navBurger.classList.add("open");
  });

  closeBtn.addEventListener("click", () => {
    console.log("× clicked");
    navBurger.classList.remove("open");
  });

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
      projectCard.innerHTML = `<h2>${project.title}</h2>`;

      
      const buttonGroup = document.createElement("div");
      buttonGroup.classList.add("project-card-btn");
      const collapseTodoBtn = document.createElement("button");
      
      collapseTodoBtn.classList.add("collapse-btn");
      const caret = document.createElement("span");
      caret.classList.add("todo-caret");
      collapseTodoBtn.appendChild(caret);

      collapseTodoBtn.addEventListener("click", () => {
        this.controller.collapseTodo(project.id)
         caret.classList.toggle("is-open");
        });
      buttonGroup.appendChild(collapseTodoBtn);

      const addTodoBtn = document.createElement("button");
      addTodoBtn.classList.add("add-todo-btn");
      addTodoBtn.addEventListener("click", () => {
        this.controller.todoForm(project.id)
          
      });
      console.log("Add todo clicked for projects:", project.id);
      buttonGroup.appendChild(addTodoBtn);


      const projectComplete = document.createElement("button");
      projectComplete.classList.add("project-complete-btn");
      if(project.completed) projectComplete.classList.add("is-complete");

      projectComplete.addEventListener("click", (event) => {
        event.stopPropagation(); 
      this.controller.toggleProjectComplete(project.id);
      });

      buttonGroup.appendChild(projectComplete);


      const removeProjectBtn = document.createElement("button");
      removeProjectBtn.classList.add("remove-project-btn");
      removeProjectBtn.addEventListener("click", () => this.controller.removeProject(project.id)); 
      console.log("Remove project clicked", project.id);
      buttonGroup.appendChild(removeProjectBtn);
       projectCard.appendChild(buttonGroup);

      const todosContainer = document.createElement("div");
      todosContainer.classList.add("todos-container");
      if(this.expandedProjects.has(project.id)) {
        todosContainer.classList.add("show");
      }
     

      project.todos.forEach(todo => {
      console.log("   ↳ Rendering todo:", todo.title, "ID:", todo.id);
        const todoEl = document.createElement("div");
        todoEl.classList.add("todo");

        const priorityClass = priorityColors[todo.priority] || "priority-low";
           
        let dueDateText = todo.date instanceof Date && isValid(todo.date)
          ? format(todo.date, "MM/dd/yyyy")
          : "No date set";
          console.log("todo.date type:", typeof todo.date, todo.date);
          console.log("is instance of Date:", todo.date instanceof Date);

        const priorityIndicator = document.createElement("span");
        priorityIndicator.classList.add("priority-indicator", priorityClass);
        todoEl.appendChild(priorityIndicator);

        const textWrapper = document.createElement("div");
        textWrapper.classList.add("todo-text");
        textWrapper.textContent = `${todo.title} - ${todo.description} (${dueDateText})`;
        todoEl.appendChild(textWrapper);
        
        const titleLabel = document.createElement("b")
        titleLabel.textContent ="Todo: ";
        const titleSpan = document.createElement("span");
        titleSpan.classList.add("todo-title");
        titleSpan.textContent = todo.title;
        if (todo.completed) {
          titleSpan.style.textDecoration = "line-through";
        }
        textWrapper.appendChild(titleLabel);
        textWrapper.appendChild(titleSpan);
        textWrapper.append(" ");

        const descLabel = document.createElement("b");
        const descSpan = document.createElement("span");
        descLabel.textContent ="Description: ";
        descSpan.classList.add("todo-desc");
        descSpan.textContent = todo.description;
        if (todo.completed) {
          descSpan.style.textDecoration = "line-through";
        }
        
        textWrapper.append(descLabel);
        textWrapper.appendChild(descSpan);
        textWrapper.append(" ");

        const dueLabel = document.createElement("b");
        const dueSpan = document.createElement("span");
        dueLabel.textContent ="Due: ";
        dueSpan.classList.add("todo-date");
        dueSpan.textContent = dueDateText;
        if (todo.completed) {
          dueSpan.style.textDecoration = "line-through";
        }

        textWrapper.appendChild(dueLabel);
        textWrapper.appendChild(dueSpan);
        todoEl.appendChild(textWrapper);
        
        

        const toggleBtn = document.createElement("button");
        toggleBtn.classList.add("todo-toggle-btn");
         if(todo.completed)toggleBtn.classList.add("todo-is-complete");
          
          toggleBtn.addEventListener("click", () => {
          this.controller.toggleComplete(project.id, todo.id);
      });
        todoEl.appendChild(toggleBtn);


        const editBtn = document.createElement("button");
        editBtn.classList.add("todo-edit-btn");
        editBtn.addEventListener("click", () => {
         const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  overlay.innerHTML = `
    <form class="modal-form">
      <label for="edit-title">Title:</label>
      <input type="text" id="edit-title" value="${todo.title}" required>

      <label for="edit-description">Description:</label>
      <textarea id="edit-description">${todo.description}</textarea>

      <label for="edit-priority">Priority:</label>
      <select id="edit-priority">
        <option value="low" ${todo.priority === "low" ? "selected" : ""}>Low</option>
        <option value="medium" ${todo.priority === "medium" ? "selected" : ""}>Medium</option>
        <option value="high" ${todo.priority === "high" ? "selected" : ""}>High</option>
      </select>

      <label for="edit-date">Due Date:</label>
      <input type="date" id="edit-date" value="${
        todo.date instanceof Date
          ? todo.date.toISOString().split("T")[0]
          : ""
      }">

      <input type="submit" value="Save">
      <button type="button" id="cancelBtn">Cancel</button>
    </form>
  `;
      document.body.appendChild(overlay);
      overlay.style.display = "flex";

      overlay.querySelector("#cancelBtn").addEventListener("click", () => overlay.remove());
      overlay.addEventListener("click", event => {
        if (event.target === overlay) overlay.remove();
      });

      overlay.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();

      const updates = {
      title: overlay.querySelector("#edit-title").value,
      description: overlay.querySelector("#edit-description").value,
      priority: overlay.querySelector("#edit-priority").value,
      date: overlay.querySelector("#edit-date").value || null
    };
        this.controller.editTodo(project.id, todo.id, updates);

        overlay.remove();
      });
    });


        todoEl.appendChild(editBtn);



        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("todo-delete-btn");
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
    const projectListEls = document.querySelectorAll("#project-list, #project-list-mobile");
    if(!projectListEls.length) return;
    
    projectListEls.forEach(projectListEl => {
projectListEl.innerHTML = "";

projects.forEach(project => {
      const item = document.createElement("div");
      item.classList.add("my-project");
      item.textContent = project.title;
      item.dataset.projectId = project.id;

      item.addEventListener("click", () => {
        this.controller.collapseTodo(project.id);
      
      });
   
        projectListEl.appendChild(item);
      });
    });
}


projectNavToggle() {
  const toggleBtns = document.querySelectorAll("#my-projects-btn, #my-projects-btn-mobile");
    console.log("toggleBtn found:", toggleBtns);
  if(!toggleBtns.length) return;

  toggleBtns.forEach(toggleBtn => {
  toggleBtn.addEventListener("click", () => {
   console.log(`${toggleBtn.id} clicked`);

    const projectListEls = document.querySelectorAll("#project-list, #project-list-mobile");
    if (!projectListEls.length) return; {
      projectListEls.forEach(projectListEl => {
      projectListEl.classList.toggle("show");
      });

     toggleBtn.parentElement.classList.toggle("open");
     } 
    });
    
  });
}


displayCompleteProjectNav(projects) {
  const projectListEls = document.querySelectorAll("#complete-project-list, #complete-project-list-mobile");
  if (!projectListEls.length) return;
  projectListEls.forEach(projectListEl => {
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
  });
}

completeProjectNavToggle() {
  const toggleBtns = document.querySelectorAll("#complete-projects-btn, #complete-projects-btn-mobile");
    console.log("toggleBtn project complete found:", toggleBtns);
    if(toggleBtns.length === 0) return;

    toggleBtns.forEach(toggleBtn => {
    toggleBtn.addEventListener("click", () => {
      console.log("complete-projects-btn clicked");
      const projectListEls = document.querySelectorAll("#complete-project-list, #complete-project-list-mobile");
      if (projectListEls.length === 0) return; 
        projectListEls.forEach(projectListEl => {
          projectListEl.classList.toggle("show");
        });

        toggleBtn.parentElement.classList.toggle("open");
    
    });
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