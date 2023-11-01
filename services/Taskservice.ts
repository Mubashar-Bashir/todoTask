import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
 import {Task,task_obj} from "../models/Task.js";
 import { WriteFileOptions } from "fs";
 import { writeTasksToFile } from "../src/index.js";
import InputPrompt from "inquirer/lib/prompts/input.js";
import inquirer from "inquirer";

class TaskService 
{
  private tasks: Task[] = [];
  private dataFilePath: string;

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const dataFilePath=this.dataFilePath = path.join(path.dirname(__filename), '..','src', 'tasks.json');
    //const this.dataFilePath = path.join(__dirname, 'src', 'tasks.json');

  }

  addTask(task: Task) 
  {
    this.tasks.push(task);
    writeTasksToFile(this.tasks);
  }
  async setTask(task: Task) {
    // Prompt the user for updated task details
    const updatedDetails = await inquirer.prompt([
        {
            type: 'input',
            name: 'task_title1',
            message: 'Enter the updated task title:',
            //default: task.task_title, // Pre-fill with the existing title
        },
        {
            type: 'input',
            name: 'task_description',
            message: 'Enter the updated task description:',
            default: task.task_description, // Pre-fill with the existing description
        },
        {
            type: 'input',
            name: 'task_dueDate',
            message: 'Enter the updated due date:',
            default: task.task_dueDate, // Pre-fill with the existing due date
        },
        {
            type: 'list',
            name: 'task_priority',
            message: 'Select the updated priority:',
            choices: ['High', 'Medium', 'Normal', 'Urgent'],
            default: task.task_priority, // Pre-fill with the existing priority
        },
        {
            type: 'list',
            name: 'task_status',
            message: 'Select the updated status:',
            choices: ['open', 'completed'],
            default: task.task_status, // Pre-fill with the existing status
        },
    ]);

    // Update the task properties with the new values
    //task.task_title       = updatedDetails.task_title1;
    task.task_title       = updatedDetails.task_title1;

    task.task_description = updatedDetails.task_description;
    task.task_dueDate     = updatedDetails.task_dueDate;
    task.task_priority    = updatedDetails.task_priority;
    task.task_status      = updatedDetails.task_status;

    // Save the updated task to your tasks array or file
    writeTasksToFile(this.tasks);
}


  listTasks() 
  {
    if (this.tasks.length>0)
    {
      return this.tasks;  
    }
    else
    return "there is no task in the list";
  }
  async updateTask(taskName: string) {
    // Find the task by name
    const taskFound = await this.FindTask(taskName);

    if (taskFound) {
        if (Array.isArray(taskFound)) {
            // If there are multiple tasks with the same name, you can handle it here
            console.log('Multiple tasks found with the same name. Handle this case.');
        } else {
            // Call the setTask method to update the task
            await this.setTask(taskFound);
            console.log(`Task "${taskName}" updated successfully.`);
        }
    } else {
        console.log(`Task "${taskName}" not found.`);
    }
}

  
  
  async DeleteTask(taskName: string) {
    // Read tasks from the file
    const tasks = await this.readTasksFromFile();
    console.log('task in file reading',tasks)
    // Find the index of the task to delete by taskName
    const taskIndex = tasks.findIndex((task) => task.task_title === taskName);
    console.log('Index of Task :',taskIndex)
    if (taskIndex !== -1) {
      // Remove the task from the tasks array
      tasks.splice(taskIndex, 1);

      // Update the file with the modified tasks
      console.log("I am going to write: ",tasks)
      this.writeTasksToFile(tasks);

      console.log(`Task "${taskName}" has been deleted.`);
    } else {
      console.log(`Task "${taskName}" not found.`);
    }
  }

  async readTasksFromFile(): Promise<Task[]> {
    try {
      const data = await fs.promises.readFile(this.dataFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading tasks:', error);
      return [];
    }
  }

   async writeTasksToFile(tasks: Task[]) {
    try {
      await fs.promises.writeFile(this.dataFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing tasks:', error);
    }
  }


// Define the Task class and other necessary code

  CompleteTask(){
    
  }
 async FindTask(taskName:string)
  {
     this.tasks.forEach(element => 
      { console.log('for each element >>>>',element);
        if(element.task_title === taskName)
        {
          console.log("task found");
        return this.tasks;
        }else{
           console.log("task not found") ;
           return this.tasks;
          }
          
      });
      return this.tasks;
  }

}
const task=new TaskService();

export default TaskService;
