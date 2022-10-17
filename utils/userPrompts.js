const db = require('mysql2');
const {prompt} = require('inquirer');

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
  
  const viewRoles = async () =>{
    const [roleData] = await db.query('SELECT * FROM employee_role');
    console.table(roleData);
    mainMenu();
  }
  
  const addDepartment = () =>{
   const userInput = prompt[
      {
        type: 'input',
        name: 'Department',
        message: 'Please enter the new Department'
        //add validation
      }
    ]
  
    db.query(`INSERT INTO department (department_name) VALUES ${userInput}`);
    const deparmentData = db.query(`SELECT * FROM department`);
    console.table(deparmentData);
  }
  
  const addRole = () => {
    //Enter name salary and department
    const userInput = prompt[
      {
        type: 'input',
        name: 'role title',
        message: 'Please enter the Role name',
        value: 'role_title'
      },
      {
        type: 'input',
        name: 'role salary',
        message: 'Please enter the Role salary',
        value: 'role_salary'
      },
      {
        type: 'input',
        name: 'role department',
        message: 'Please enter the Department ID',
        value: 'department_id'
      }
    ]
  
    db.query(`INSERT INTO employee_role (role_title,role_salary,department_id) VALUES ${userInput}`);
    const roleData = db.query(`SELECT * FROM employee_role`);
    console.log(roleData);
  }
  
  const addEmployee = () =>{
    //Enter first_name last_name role and manager
  }
  
  const updateRole = () =>{
    //Show list of employees and select
    //Show list of departments 
    //Show list of Roles
    //Option to update salary
    //Option to update manager
  }

  module.exports = {
    viewEmployees,
    viewDepartments,
    viewRoles,
    addDepartment,
    addRole,
    addEmployee,
    updateRole
  };