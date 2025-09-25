import Project from "./project.js";
import Todo from "./todo.js";

export default class ProjectList {
    constructor() {
    this.projects = [];
    

    const codeProject = new Project("Tic Tac Toe");
    codeProject.addTodo(new Todo("brainstorm game logic", "psuedocode game logic", "medium", true, "2025-07-25"));
    codeProject.addTodo(new Todo("code logic", "make working game logic using factories and module patterns ", "medium", true, "2025-07-26"));
    codeProject.addTodo(new Todo("create dom", "incorporate DOM with game logic", "medium", true, "2025-07-27"));
    codeProject.addTodo(new Todo("finish project", "clean up code, and style of project", "low", true, "2025-07-28"));
     this.projects.push(codeProject);

    const defaultProject = new Project("Personal");
    defaultProject.addTodo(new Todo("Groceries", "apples, milk, eggs, cheese", "high", false, "2025-09-20"));
    defaultProject.addTodo(new Todo("Clean Kitchen", "sink, pantry, fridge", "medium", false, "2025-09-24"));
    defaultProject.addTodo(new Todo("Vacuum", "vacuum main floor", "low", false, "2025-09-27"));
    this.projects.push(defaultProject);

    }
    addProject(project) {
        if(project instanceof Project) {
            this.projects.push(project)
        } else {
            throw new Error ("Only Project objects can be added")
        }
    }
    removeProject(id) {
        this.projects = this.projects.filter(project => String(project.id) !== String(id));
    }


  getProject(id) {
  console.log("📥 Looking up project with ID:", id);
  const found = this.projects.find(project => String(project.id) === String(id));
  console.log("📤 Found project:", found ? found.title : "❌ Not found");
  return found;
}

}