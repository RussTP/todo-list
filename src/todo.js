

export class Todo {
    constructor(title, description, priority, complete) {
        this.id = crypto.randomUUID();
        this.task = [];
        this.date = [];
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.complete = complete;
        }

}
    

