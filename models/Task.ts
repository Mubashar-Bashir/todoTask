class Task {
  task_title: string;
  task_description: string;
  task_dueDate: string;
  task_status: 'open' | 'completed';
  task_priority: 'High' | 'Medium' | 'Normal' | 'Urgent' = 'Normal';

  constructor(
    title:        string,
    description:  string,
    dueDate:      string,
    status:       'open' | 'completed',
    priority?:    'High' | 'Medium' | 'Normal' | 'Urgent'
  ) {
    this.task_title       = title;
    this.task_description = description;
    this.task_dueDate     = dueDate;
    this.task_status      = status;
    this.task_priority    = priority || 'Normal';
  }
}
 const task_obj=new Task("Python_class","class-12 08-10",'02/11/2023',"open","High"); 
export {Task,task_obj};
  