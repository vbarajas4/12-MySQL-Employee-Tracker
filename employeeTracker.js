//dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

//credentials
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employeeDB"
});

// connect to my sql database and run the start function once its made the connection
connection.connect((err) => {
  if (err) throw err;
  runPrompt();
});

// function which prompts the user what they will like to do
function runPrompt() {

  inquirer
    .prompt([{
      type: "list",
      name: "toDo",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee Role",
        "End"]
    }])
    .then(response => {
      switch (response.toDo) {

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "View Departments":
            viewDepartments();
            break;

        case "View Roles":
            viewRoles();
            break;

        case "View Employees":
            viewEmployees();
            break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "End":
          connection.end();
          break;
      }
    });
}
function addDepartment() {
    inquirer.prompt([
        {
        type: "input",
        name: "department",
        message: "What is the name of the department that you would like to add?"
        }])
        .then(response => {
        var department = response.department;
        connection.query('INSERT INTO department SET ?', {name: department}, err => {
            if (err) throw err
            console.table("Successfully Inserted");
            runPrompt();
        }).catch(err => {console.error(err)})
    
})}

function viewDepartments() {
    connection.query("SELECT * FROM department", (err, data) => {
        if(err) throw err
        console.table(data);
        runPrompt();
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "enter role title:"
        }, 
        {
            type: "number",
            name: "salary",
            message: "enter role salary:"
        }, 
        {
            type: "number",
            name: "department_id",
            message: "enter department ID:"
        }])
    .then(response => {
        connection.query('INSERT INTO role SET ?', {title: response.title, salary: response.salary, department_id: response.department_id}, (err, data) => {
            if(err) throw err 
            console.table(data)
        } )

            
       
        runPrompt();
    })

}

function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, data) => {
        if(err) throw err
        console.table(data);
        runPrompt();
    })
}

