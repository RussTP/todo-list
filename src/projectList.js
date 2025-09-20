import Project from "./project.js";
import Todo from "./todo.js";

export default class ProjectList {
    constructor() {
    this.projects = [];

    const codeProject = new Project("Tic Tac Toe");
    codeProject.addTodo(new Todo("brainstorm game logic", "psuedocode game logic", "medium", true, "2025-07-25"));
    codeProject.addTodo(new Todo("code logic", "make working game logic using factories and module patterns ", "medium", true,"2025-07-26"));
    
    const defaultProject = new Project("Personal");
    defaultProject.addTodo(new Todo("Groceries", "apples, milk, eggs, cheese", "high", false, "2025-09-20"));

    this.projects.push(codeProject, defaultProject);

    }
    addProject(project) {
        if(project instanceof Project) {
            this.projects.push(project)
        } else {
            throw new Error ("Only Project objects can be added")
        }
    }
    removeProject(id) {
        this.projects = this.projects.filter(project => project.id !== id);
    }
    getProject(id) {
        return this.projects.find(project => project.id === id);
    }
}