import {parseISO, isValid} from "date-fns";

export default class Todo {
  constructor(title, description, priority, completed = false, date) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.completed = completed;
    this.date = date;
  
    if (typeof date === "string") {
      const parsed = parseISO(date);
      this.date = isValid(parsed) ? parsed:null;
    }else {
      this.date = date instanceof Date ? date:null;
    }
  }
  toggleComplete() {
    this.completed = !this.completed;
  }
}