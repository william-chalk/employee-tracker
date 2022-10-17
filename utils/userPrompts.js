const mysql = require('mysql2');
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
    db.query("SELECT employee.first_name, employee.last_name, employee_role.role_title, employee_role.role_salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN employee_role on employee_role.id = employee.role_id INNER JOIN department on department.id = employee_role.department_id left join employee e on employee.manager_id = e.id;",(err,res)=>{
        if(err) throw err;
        console.table(res);
        mainMenu();
    });
  };
  
  const viewDepartments = async () => {
    db.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN employee_role ON employee.role_id = employee_role.id JOIN department ON employee_role.department_id = department.id ORDER BY employee.id;",(err,res)=>{
        if(err) throw err;
        console.table(res);
        mainMenu();
    });
  };
  
  const viewRoles = async () =>{
    db.query("SELECT employee.first_name, employee.last_name, employee_role.title AS Title FROM employee JOIN role ON employee.role_id = employee_role.id;",(err,res)=>{
        if(err) throw err;
        console.table(res);
        mainMenu();
    });
  }
  
  const addDepartment = () =>{
   const userInput = prompt([
      {
        type: 'input',
        name: 'Department',
        message: 'Please enter the new Department'
        //add validation
      }
    ])
  
    db.query(`INSERT INTO department (department_name) VALUES ${userInput}`);
    const deparmentData = db.query(`SELECT * FROM department`);
    console.table(deparmentData);
  }
  
  const addRole = () => {
    //Enter name salary and department
    const userInput = prompt([
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
    ])
  
    db.query(`INSERT INTO employee_role (role_title,role_salary,department_id) VALUES ${userInput}`);
    const roleData = db.query(`SELECT * FROM employee_role`);
    console.table(roleData);
  }
  
  const addEmployee = () =>{
    //Enter first_name last_name role and manager
    const userInput = prompt([
        {
            type:'input',
            name: 'firstName',
            message: "Please type employee's first name.",
            value:'first_name'
        },
        {
            type: 'input',
            name: 'lastName',
            message: "Please type the employee's last name",
            value: 'last_name'
        },
        {
            type: 'list',
            name:'roleAssign',
            message: "Please select the employee's role",
            choices: listRoles()
        },
        {
            type: 'list',
            name: 'managerID',
            message: "Please select the employee's manager",
            choices: listManagers()
        }
    ]).then((val)=>{
        const roleID = listRoles().indexOf(val.role) + 1;

        db.query(`UPDATE employee SET WHERE id = ?`,{
            last_name: val.lastName
        },
        {
            role_id: roleID
        },
        function(err){
            if(err) throw err;
            console.table(val);
            mainMenu();
        }
        );

    });

  }
  
  const updateRole = () =>{
    //Show list of employees and select
    //Show list of departments 
    //Show list of Roles
    //Option to update salary
    //Option to update manager
  }

  const roleArr = [];
  const listRoles = () =>{
    db.query(`SELECT * FROM employee_role`,(err,res)=>{
        if(err) throw err;
        for(let i = 0; i<res.length;i++){
            roleArr.push(res[i].role_title);
        }
    });
    return roleArr; 
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