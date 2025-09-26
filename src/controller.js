// controller.js
import Project from "./project.js";
import Todo from "./todo.js";
import ProjectList from "./projectList.js";

export default class Controller {
  constructor(display, projectList = null) {
    this.display = display;
    this.projectList = projectList || new ProjectList();

    if (this.display) this.display.controller = this;

    console.log("Controller initialized. Projects:", this.projectList.projects.map(p => ({ id: p.id, title: p.title })));

    // Render on startup
    if (this.display && typeof this.display.displayProjects === "function") {
      this.display.displayProjects(this.projectList.projects);
      if (typeof this.display.displayProjectNav === "function") {
        this.display.displayProjectNav(this.projectList.projects);
      }
    }
  }

  createProject(title) {
    console.log("createProject called with title:", title);
    const project = new Project(title);
    this.projectList.addProject(project);
    console.log("Project created ->", project.id, project.title);
    this.display.displayProjects(this.projectList.projects);
    if (typeof this.display.displayProjectNav === "function") {
      this.display.displayProjectNav(this.projectList.projects);
    }
  }

  addTodo(projectId, todoData) {
    console.log("addTodo called for projectId:", projectId, "with data:", todoData);
    const project = this.projectList.getProject(projectId);
    if (!project) {
      console.error("addTodo: Project not found for id:", projectId, "current IDs:", this.projectList.projects.map(p => p.id));
      return;
    }

    const date = todoData.date ? new Date(todoData.date) : null;
    const todo = new Todo(todoData.title, todoData.description || "", todoData.priority, false, date);
    project.addTodo(todo);
    console.log("Todo added:", todo.id, "to project:", project.id);
    this.display.displayProjects(this.projectList.projects);
  }

  removeTodo(projectId, todoId) {
    console.log("removeTodo called with:", { projectId, todoId });
    const project = this.projectList.getProject(projectId);
    if (!project) {
      console.error("removeTodo: Project not found for id:", projectId, "projects:", this.projectList.projects.map(p => p.id));
      return;
    }

    const normalizedTodoId = String(todoId);
    const idx = project.todos.findIndex(t => String(t.id) === normalizedTodoId);
    if (idx === -1) {
      console.error("removeTodo: Todo not found:", todoId, "in project:", project.id, "todoIDs:", project.todos.map(t => t.id));
      return;
    }

    project.todos.splice(idx, 1);
    console.log("Todo removed. Project todos now:", project.todos.map(t => t.id));
    this.display.displayProjects(this.projectList.projects);
  }

  collapseTodo(projectId) {
  this.display.toggleExpanded(projectId);
  }

  toggleComplete(projectId, todoId) {
    console.log("toggleComplete called for projectId:", projectId, "todoId", todoId);
    const project = this.projectList.getProject(projectId);
    if (!project) {
      console.error("toggleComplete: project not found", projectId);
      return;
    }

    const todo = project.todos.find(t => String(t.id) === String(todoId));
    if (!todo) {
      console.error("toggleComplete: todo not found", todoId, "in project", project.id);
      return;
    }

    if (typeof todo.toggleComplete === "function") {
      todo.toggleComplete();
    } else {
      todo.completed = !todo.completed;
    }

    console.log("Todo after toggle:", todo);
    this.display.displayProjects(this.projectList.projects);
  }

    toggleProjectComplete(projectId) {
    console.log("toggle Project Complete projectId:", projectId);
    const project = this.projectList.getProject(projectId);
    if (!project) {
      console.error("project complete: project not found", projectId);
      return;
    }
    if (typeof project.toggleProjectComplete === "function") {
      project.toggleProjectComplete();
    }else {
      project.completed = !project.completed;
    }
    console.log("project completed:", project);
    this.display.displayProjects(this.projectList.projects);
  }

  todoForm(projectId) {
    this.display.todoForm(projectId);
  }

  removeProject(projectId) {
    console.log("remove project called from projectId:", projectId);
    this.projectList.removeProject(projectId);
    console.log("Projects after removal:", this.projectList.projects.map(p => p.id));
    this.display.displayProjects(this.projectList.projects);
    if (typeof this.display.displayProjectNav === "function") {
      this.display.displayProjectNav(this.projectList.projects);
    }
  }
}
