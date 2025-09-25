

export default class Todo {
  constructor(title, description, priority, completed = false, date = null) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.completed = completed;
    this.date = date instanceof Date ? date : (date ? new Date(date):null);
      }
  toggleComplete() {
    this.completed = !this.completed;
    }
  }
