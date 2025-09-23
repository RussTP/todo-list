import Project from "./project.js";
import Todo from "./todo.js";
import ProjectList from "./projectList.js";
import { Display } from "./dom.js";


export default class Controller {
    constructor(display) {
        this.display = display;
        this.projectList = new ProjectList();
        this.display.displayProjects(this.projectList.projects);
    }
    createProject(title) {
        console.log("createProject called with title:", title);
        const project = new Project(title);
        console.log("new project created:", project)
        this.projectList.addProject(project);
        console.log("project list now:", project)
        this.display.displayProjects(this.projectList.projects);
        this.display.displayProjectNav(this.projectList.projects);
    }

    addTodo(projectId, todoData) {
        console.log("addTodo called for projectId:", projectId, "with data:", todoData);
        const project = this.projectList.getProject(projectId);
        if (!project) {
            console.warn("Project not found for id:", projectId);
         return;
        }
        const date = todoData.date ? new Date(todoData.date) : null;
        const todo = new Todo(todoData.title,
             todoData.description || "",
             todoData.priority,
             false,
             date
        );
        console.log("New todo:", todo);

             project.addTodo(todo);
             console.log("Updated project.todos:", project.todos);
        this.display.displayProjects(this.projectList.projects);
    }

    removeTodo(projectId, todoId) {
        console.log("removeTodo called for projectId:", projectId, "todoId:", todoId);
        const project = this.projectList.getProject(projectId);
        if(!project) return;
        project.removeTodo(todoId);
        this.display.displayProjects(this.projectList.projects);
    }

        collapseTodo(projectId) {
        const projectCard = document.querySelector(` #project-${projectId}`);
        if (!projectCard) return;
           
        const todosContainer = projectCard.querySelector(".todos-container");
        if (!todosContainer) return;
        console.log("Collapsing todos for project:", projectId, todosContainer);
        todosContainer.classList.toggle("show");
         }

    toggleComplete(projectId, todoId) {
        console.log("toggleComplete called for projectId:", projectId, "todoId", todoId);
        const project = this.projectList.getProject(projectId);
        if(!project) return;
        
        const todos = project.todos.find(todo => todo.id === todoId);
        if (!todos)  return;

        todos.toggleComplete()
        console.log("Todo after toggle:", todos);
        this.display.displayProjects(this.projectList.projects);
    }



    todoForm(projectId) {
        this.display.todoForm(projectId);
    }

    removeProject(projectId) {
        console.log("remove project called from projectId:", projectId)
        this.projectList.removeProject(projectId);
        console.log("Current project IDs:", 
            this.projectList.projects.map(p => p.id));
        
        this.display.displayProjects(this.projectList.projects);
        this.display.displayProjectNav(this.projectList.projects);
    }


    }



