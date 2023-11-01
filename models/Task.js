class Task {
    constructor(title, description, dueDate, status, priority) {
        this.task_priority = 'Normal';
        this.task_title = title;
        this.task_description = description;
        this.task_dueDate = dueDate;
        this.task_status = status;
        this.task_priority = priority || 'Normal';
    }
}
const task_obj = new Task("Python_class", "class-12 08-10", '02/11/2023', "open", "High");
export { Task, task_obj };
