

export class Todo {
    constructor(title, description, priority, complete, date = null) {
        this.id = crypto.randomUUID();
        this.tasks = [];
        this.date = date instanceof Date ? date: null;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.complete = complete;
        }

}
    

