// index.ts
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import inquirer from 'inquirer';
import TaskService from '../services/TaskService.js';
import {Task, task_obj} from '../models/Task.js';
import { type } from 'os';

const taskService = new TaskService();
const dataFilePath = path.join(__dirname, 'tasks.json');

//           Read Task todolist from file task.json  in the sam directory    ///////////
async function readTasksFromFile() {
    try {
      const data = await fs.promises.readFile(dataFilePath, 'utf-8');
      const tasks = JSON.parse(data);
      return tasks;
    } catch (error) {
      console.error('Error reading tasks:', error);
      return [];
    }
  }
//           write Task todolist in file task.json     ///////////
 export async function writeTasksToFile(tasks: any[]) {
    try {
      const data = JSON.stringify(tasks, null, 2); // The second argument formats the JSON for readability
      await fs.promises.writeFile(dataFilePath, data);
     // console.log('Tasks saved to file.');
    } catch (error) {
      console.error('Error writing tasks:', error);
    }
  }
  
  
////////// Main Menue for Display of Choices TODO List ///////////////
const mainMenu = async () => {
  const { action } = await inquirer.prompt(
    {
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: ['Add Task', 'View Tasks','Update Tasks','Delete Tasks', 'Quit']
    }
  );

  switch (action) {
    //            case for Add Task  ///////////////
    case 'Add Task':
      const taskDetails = await inquirer.prompt
     (
        [
        // Prompt for task details
       
            {
              type: 'input',
              name: 'task_title',
              message: 'Task Title:',
            },
            {
              type: 'input',
              name: 'description',
              message: 'Task Description:',
            },
            {
              type: 'input',
              name: 'dueDate',
              message: 'Due Date (optional):',
            },
            {
                type: 'list',
                name: 'priority',
                message: 'Set Periority  (optional):',
                choices: ['High','Medium','Urgent','Normal'],
                
              },
        ]
     );
     //console.log(taskDetails);   
     //const tasksfromFile= await readTasksFromFile();
     const readtask = await readTasksFromFile();

if (!readtask || !readtask.task || readtask.task.task_title !== taskDetails.task_title) {
  // Your code to add a new task here
} else {
  console.log(`Task with Name (${readtask.task.task_title})`);
}

     
      
      break;

      //            case List_View of Task  ///////////////
    case 'View Tasks':
        const tasksfromFile= await readTasksFromFile(); // for file reading tasks1
        console.log('Tasks from files:');      
        console.log(tasksfromFile)
        const tasksfromArray = taskService.listTasks(); // for read from array
      // Display tasks
      console.log('Tasks From Arry:');
      console.log(tasksfromArray);
      break;

      //            case Update of Task  ///////////////
    case 'Update Tasks':
       const taskName= await inquirer.prompt([
        {
            type: 'input',
            name: 'task_Name',
            message: 'Enter Task Name to Update :',
          },
       ]);
       const found=await taskService.FindTask(taskName.task_Name)
          if(found)
          {
            console.log("Found to Update : ",found.values)
            await taskService.setTask(taskName.task_Name);
          }
          else
          {
            console.log('Not Found to Update : ',found)
          }

       //taskService.updateTask(taskName.task_Name);
      break;

      //            case Delete of Task  ///////////////
    case 'Delete Tasks':
      const taskName2= await inquirer.prompt([
       {
           type: 'input',
           name: 'taskName',
           message: 'Enter Task Name :',
         },
      ]);
      console.log('Deleting to ',taskName2)
      taskService.DeleteTask(taskName2);
     break;
      //            case Quit Task Status ///////////////
    case 'Quit':
      console.log('Goodbye!');
      return;
  }

  mainMenu(); // Continue looping the menu
};

mainMenu(); // Start the app
