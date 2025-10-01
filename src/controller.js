
import Project from "./project.js";
import Todo from "./todo.js";
import ProjectList from "./projectList.js";
import Storage from "./storage.js";
import { saveProjects, loadProjects } from "./storage.js";

export default class Controller {
  constructor(display, projectList = null) {
    this.display = display;
    this.projectList = projectList || new ProjectList();
    
   const savedProjects = loadProjects();
    if (savedProjects.length) {
      this.projectList.projects = savedProjects;
    }

    if (this.display) this.display.controller = this;
   
    if (this.display && typeof this.display.displayProjects === "function") {
      this.display.displayProjects(this.projectList.projects);
      if (typeof this.display.displayProjectNav === "function") {
        this.display.displayProjectNav(this.projectList.projects);
      }
      if (typeof this.display.displayCompleteProjectNav === "function") {
        this.display.displayCompleteProjectNav(this.projectList.projects);
      }
    }
  }

  createProject(title) {
    const project = new Project(title);
    this.projectList.addProject(project);
    saveProjects(this.projectList.projects)
    this.display.displayProjects(this.projectList.projects);
    if (typeof this.display.displayProjectNav === "function") {
      this.display.displayProjectNav(this.projectList.projects);
    }
  }

  addTodo(projectId, todoData) {
    const project = this.projectList.getProject(projectId);
    if (!project) return;
  

    const date = todoData.date ? new Date(todoData.date) : null;
    const todo = new Todo(todoData.title, todoData.description || "", todoData.priority, false, date);
    project.addTodo(todo);
    this.display.displayProjects(this.projectList.projects);
    saveProjects(this.projectList.projects)
  }

  removeTodo(projectId, todoId) {
    const project = this.projectList.getProject(projectId);
    if (!project) return;
    const normalizedTodoId = String(todoId);
    const idx = project.todos.findIndex(t => String(t.id) === normalizedTodoId);
    if (idx === -1) return;
    project.todos.splice(idx, 1);
    this.display.displayProjects(this.projectList.projects);
    saveProjects(this.projectList.projects)
  }


      editTodo(projectId, todoId, updates) {
      const project = this.projectList.getProject(projectId);
      if (!project) {
        return;
      }
      
      const todo = project.todos.find(t => String(t.id) === String(todoId));
      if (!todo) return;
      if (updates.title !== undefined) todo.title = updates.title;
      if (updates.description !== undefined)todo.description = updates.description;
      if (updates.priority !== undefined)todo.priority = updates.priority;
      if (updates.date !== undefined)todo.date = updates.date;
      this.display.displayProjects(this.projectList.projects);
      saveProjects(this.projectList.projects)
      
    }

  collapseTodo(projectId) {
  this.display.toggleExpanded(projectId);
  }

  toggleComplete(projectId, todoId) {
    const project = this.projectList.getProject(projectId);
    if (!project) return;
    

    const todo = project.todos.find(t => String(t.id) === String(todoId));
    if (!todo) return;
  

    if (typeof todo.toggleComplete === "function") {
      todo.toggleComplete();
    } else {
      todo.completed = !todo.completed;
    }
    this.display.displayProjects(this.projectList.projects);
  }

    toggleProjectComplete(projectId) {
    const project = this.projectList.getProject(projectId);
    if (!project) return;
    if (typeof project.toggleProjectComplete === "function") {
      project.toggleProjectComplete();
      saveProjects(this.projectList.projects)
    }else {
      project.completed = !project.completed;
    }
    this.display.displayProjects(this.projectList.projects);
    this.display.displayCompleteProjectNav(this.projectList.projects);
    
  }

  todoForm(projectId) {
    this.display.todoForm(projectId);
  }

  removeProject(projectId) {
    this.projectList.removeProject(projectId);
    this.display.displayProjects(this.projectList.projects);
    if (typeof this.display.displayProjectNav === "function") {
      this.display.displayProjectNav(this.projectList.projects);
      saveProjects(this.projectList.projects)
    
    if (typeof this.display.displayCompleteProjectNav ==="function") {
      this.display.displayCompleteProjectNav(this.projectList.projects);
      saveProjects(this.projectList.projects)
      }
  }
}


};