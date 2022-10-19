const db = require("../db/connection");
const { prompt } = require("inquirer");

const mainMenu = () => {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
          "View ALL Employees",
          "View ALL Departments",
          'View ALL Roles',
          'View ALL Employees By Role',
          'View ALL Employees By Department',
          "Add a Department",
          'Add a Role',
          'Add a Employee',
          'Update Employee Role',
          "Exit"    
      ]
    }
  ]).then((val)=>{
    switch(val.choice){
      case 'View ALL Employees':
        viewAllEmployees();
        break;
      case 'View ALL Departments':
        viewAllDepartments();
        break;
      case 'View ALL Roles':
        viewAllRoles();
        break;
      case 'View ALL Employees By Role':
        viewEmployeesByRole();
        break;
      case 'View ALL Employees By Department':
        viewEmployeesByDepartments();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add a Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployee();
        break;
      case "Exit":
        process.exit();
    }
  });

};

const viewAllEmployees = () =>{
  db.query(`SELECT * FROM employee`,(err,res)=>{
    if(err) throw err;
    console.table(res);
    mainMenu();
  });
}

const viewAllRoles = () =>{
  db.query(`SELECT * FROM role`,(err,res)=>{
    if(err) throw err;
    console.table(res);
    mainMenu();
  })
}


const viewAllDepartments = () =>{
  db.query(`SELECT * FROM department`,(err,res)=>{
    if(err) throw err;
    console.table(res);
    mainMenu();
  });
}

const viewEmployeesByDepartments = () =>{
  db.query(`SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;`,(err,res)=>{
    if(err) throw err;
    console.table(res);
    mainMenu();
  });
}

const viewEmployeesByRole = () =>{
  db.query(`SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;`,(err,res)=>{
    if(err) throw err;
    console.table(res);
    mainMenu();
  });
}

const departArr = [];
const listDepartments = () =>{
  db.query(`SELECT * FROM department`,(err,res)=>{
    if(err) throw err;
    for(let i = 0; i<res.length;i++){
      departArr.push(res[i].name);
    }
  });
  return departArr;
}

const roleArr = [];
const listRoles = () =>{
  db.query(`SELECT * FROM role`,(err,res)=>{
    if(err) throw err;
    for(let i = 0; i<res.length;i++){
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}

const managerArr = [];
const listManagers = () =>{
  db.query(`SELECT first_name, last_name FROM employee WHERE manager_id IS NULL`,(err,res)=>{
    if(err) throw err;
    for(let i = 0;i<res.length;i++){
      managerArr.push(res[i].first_name);
    }
  });
  return managerArr;
}

const addEmployee = () =>{
  prompt([
    {
      name: 'firstName',
      type: 'input',
      message: 'Please enter the Employees FIRST name'
    },
    {
      name: 'lastName',
      type: 'input',
      message: 'Please enter the Employees LAST name'
    },
    {
      name: 'role',
      type: 'list',
      message: 'Please select their role.',
      choices: listRoles()
    },
    {
      name: 'choice',
      type: 'managerList',
      message: 'Who is their Manager?',
      choices: listManagers()
    }
  ]).then((val)=>{
    const roleID = listRoles().indexOf(val.role) + 1;
    const managerID = listManagers().indexOf(val.choice) + 1;

    db.query(`INSERT INTO employee SET ?`,
    {
      first_name: val.firstName,
      last_name: val.lastName,
      manager_id: managerID,
      role_id: roleID
    },(err)=>{
      if(err) throw err;
      console.table(val);
      mainMenu();
    });
  });
}

const addRole = () =>{
  db.query(`SELECT role.title AS Title, role.salary AS Salary FROM role`,(err,res)=>{
    if(err) throw err;
    prompt([
      {
        name: 'Title',
        type: 'input',
        message: 'Please enter the Role Title.'
      },
      {
        name: 'Salary',
        type: 'input',
        message: 'Please enter the Role Salary.'
      },
      {
        name: 'Department',
        type: 'rawlist',
        message: 'Please choose the roles department',
        choices: listDepartments()
      }
    ]).then((res)=>{
      const departmentID = listDepartments().indexOf(res.choice) + 1;

      db.query(`INSERT INTO role SET ?`,{
        title: res.Title,
        salary: res.Salary,
        department_id: departmentID
      },(err)=>{
        if(err) throw err;
        console.table(res);
        mainMenu();
      })
    })
  })
}

const addDepartment = () =>{
  prompt([
    {
      name: 'name',
      type: 'input',
      message: 'Please enter the Department Name'
    }
  ]).then((res)=>{
    db.query(`INSERT INTO department SET ?`,
    {
      name: res.name
    },
    (err)=>{
      if(err) throw err;
      console.table(res);
      mainMenu();
    }
    )
  })
}

const updateEmployee = () =>{
  db.query(`SELECT employee.last_name,role.title FROM employee JOIN role ON employee.role_id = role.id;`,(err,res)=>{
    if(err) throw err;
    console.table(res);
    prompt([
      {
        name: 'lastName',
        type: 'rawlist',
        choices: () =>{
          const lastName = [];
          for(let i=0;i<res.length;i++){
            lastName.push(res[i].last_name);
          }
          return lastName;
        },
        message:'What is the employees LAST name?'
      },
      {
        name: 'role',
        type: 'rawlist',
        message: 'What is the employees new title?',
        choices: listRoles()
      }
    ]).then(function(val){
      const roleID = listRoles().indexOf(val.role) + 1;
      db.query(`UPDATE employee SET ? WHERE employee.id = ?`,[{
        last_name: val.lastName
      },
      {
        role_id: roleID
      }],(err)=>{
        if(err) throw err;
        console.table(val);
        mainMenu();
      });
    });
  });
}



module.exports = {
  mainMenu
}
