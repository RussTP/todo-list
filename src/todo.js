

export class Todo {
    constructor(title, description, priority, complete) {
        this.id = crypto.randomUUID();
        this.checklist = [];
        this.date = [];
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.complete = complete;
        }

}
    

