import Todo from "./todo.js";
import Project from "./project.js";
 

const STORAGE_KEY = "todo-projects";

export function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadProjects() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  const parsed = JSON.parse(data);


  return parsed.map(p => {
    const proj = new Project(p.title);
    proj.id = p.id;
    proj.completed = p.completed || false;
    proj.todos = p.todos.map(t => {
      const todo = new Todo(t.title, t.description, t.priority, t.completed);
      todo.id = t.id;
      todo.date = t.date ? new Date(t.date) : null;
      return todo;
    });
    return proj;
  });
}
