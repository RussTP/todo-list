import Project from "./project.js";
import { format, isValid } from "date-fns";

export class Display {
  constructor() {
    this.project = new Project();
  }


addProject() {
  const content = document.querySelector("#form-container");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  overlay.innerHTML = `
    <form class="modal-form">
      <label for="title">Project title:</label>
      <input type="text" id="title" name="title" required>

      <label for="description">Description:</label>
      <input type="text" id="description" name="description" required>

      <label for="priority">Priority 0-5</label>
      <input type="range" id="priority" name="priority" min="0" max="5">

      <label for="date">Due date:</label>
      <input type="date" id="due-date" name="due-date" required>

      <input type="submit" id="submit" value="Submit">
      <button type="button" id="cancelBtn">Cancel</button>
    </form>
  `;

  content.appendChild(overlay);
  overlay.style.display = "flex";


  overlay.querySelector("#cancelBtn").addEventListener("click", () => {
    overlay.remove();
  });


  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.remove();
  });


  const form = overlay.querySelector(".modal-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = form.querySelector("#title").value;
    const description = form.querySelector("#description").value;
    const priority = form.querySelector("#priority").value;
    const dateStr = form.querySelector("#due-date").value;
    const date = dateStr ? new Date(dateStr) : null;

    this.project.addTodo(title, description, priority, date);

    overlay.remove(); 
    this.displayProject();
  });
}

  displayProject() {
    const content = document.querySelector("#project-container");
    content.innerHTML = "<h1>My Projects</h1>";

    this.project.todos.forEach((todo) => {
  const projectCard = document.createElement("div");
  projectCard.classList.add("project-card");
  projectCard.id = `project-${todo.id}`;

  let dueDateText = "No date set";
  if (todo.date instanceof Date && isValid(todo.date)) {
    dueDateText = format(todo.date, "MM/dd/yyyy");
  }

  projectCard.innerHTML = `
    <h3>${todo.title}</h3>
    <p>${todo.description}</p>
    <p>Priority: ${todo.priority}</p>
    <p>Due: ${dueDateText}</p>
  `;


  const taskBtn = document.createElement("button");
  taskBtn.textContent = "Add Task";
  taskBtn.addEventListener("click", () => this.addNewTask(todo.id));
  projectCard.appendChild(taskBtn);


  const tasksContainer = document.createElement("div");
  tasksContainer.classList.add("task-container");

  if (todo.tasks && todo.tasks.length > 0) {
    todo.tasks.forEach((task) => {
      const taskEl = document.createElement("div");
      taskEl.classList.add("task");

      const taskText = document.createElement("span");
      taskText.textContent = task.title;
      if (task.completed) {
        taskText.style.textDecoration = "line-through";
      }

      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = task.completed ? "Undo" : "Complete";
      toggleBtn.addEventListener("click", () => {
        task.completed = !task.completed;
        this.displayProject();
      });
      taskEl.appendChild(toggleBtn);
      taskEl.appendChild(taskText);
      tasksContainer.appendChild(taskEl);
    });
  } 

  projectCard.appendChild(tasksContainer);
  content.appendChild(projectCard); 
    });
  }


  addNewTask(projectId) {
  const projectCard = document.querySelector(`#project-${projectId}`);
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  overlay.innerHTML = `
    <form class="modal-form">
      <label for="task">Task:</label>
      <input type="text" id="task" name="task" required>

      <input type="submit" value="Submit">
      <button type="button" id="cancelBtn">Cancel</button>
    </form>
  `;

  projectCard.appendChild(overlay);
  overlay.style.display = "flex";


  overlay.querySelector("#cancelBtn").addEventListener("click", () => {
    overlay.remove();
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.remove();
  });


  const form = overlay.querySelector(".modal-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskName = form.querySelector("#task").value;
    if (!taskName) return;
        
    const project = this.project.todos.find((p) => p.id === projectId);
    if(!project.tasks) project.tasks = [];
        project.tasks.push({
          id: Date.now(),
          title: taskName,
          completed: false
        });

    overlay.remove(); 
    this.displayProject(); 
    });
  }
}
