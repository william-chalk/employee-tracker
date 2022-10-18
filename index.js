const {prompt} = require("inquirer");
const db = require("./db/connection");
const {mainMenu} = require('./utils/userPrompts');
require("console.table");

db.connect(()=>{
  console.log('Connected');
  mainMenu();
})





