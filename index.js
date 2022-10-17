const { prompt } = require("inquirer");
const mysql = require("mysql2");
const {addDepartment,addEmployee,addRole,viewRoles,viewDepartments,viewEmployees,updateRole} = require('./utils/userPrompts');
require("console.table");

const mainMenu = async () => {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View ALL Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View ALL Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: 'View ALL Roles',
          value:'VIEW_ROLES'
        },
        {
          name: "Add a Department",
          value: 'ADD_DEPARTMENT'
        },
        {
          name: 'Add a Role',
          value: 'ADD_ROLE'
        },
        {
          name: 'Add a Employee',
          value: 'ADD_EMPLOYEE'
        },
        {
          name: 'Update Employee Role',
          value: 'UPDATE_EMPLOYEE_ROLE'
        },
        {
          name: "Exit",
          value: "EXIT",
        }
        
      ],
    },
  ]);

  switch (choice) {
    case "VIEW_EMPLOYEES":
      viewEmployees();
      break;
    case "VIEW_DEPARTMENTS":
      viewDepartments();
      break;
    case 'VIEW_ROLES':
      viewRoles();
      break;
    case 'ADD_DEPARTMENT':
      addDepartment();
      break;
    case 'ADD_ROLE':
      addRole();
      break;
    case 'ADD_EMPLOYEE':
      addEmployee();
      break;
    case 'UPDATE_EMPLOYEE_ROLE':
      updateRole();
      break;
    case "EXIT":
      process.exit();
    default:
      process.exit();
  }
};

mainMenu();



