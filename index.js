const { prompt } = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const db = mysql
  .createConnection(
    {
      host: "localhost",
      user: "root",
      password: "rootroot",
      database: "employees",
    },
    console.log("Connected to database")
  )
  .promise();

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
          name: "Exit",
          value: "EXIT",
        },
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
    case "EXIT":
      process.exit();
    default:
      process.exit();
  }
};

const viewEmployees = async () => {
  const [employeeData] = await db.query(`SELECT * FROM employee`);
  console.table(employeeData);
  mainMenu();
};

const viewDepartments = async () => {
  const [departmentData] = await db.query(`SELECT * FROM deparment`);
  console.table(departmentData);
  mainMenu();
};

mainMenu();
