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

  connection.query('SELECT * FROM department', (err, departments) => {
    if(err) throw err
    var departmentNames = departments.map(({name}) => name)

    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "enter role title:"
        }, 
        {
            type: "number",
            name: "salary",
            message: "enter role's annual salary:"
        }, 
        {
            type: "list",
            name: "departmentName",
            message: "What department does this role belong to?",
            choices: departmentNames
        }])
        .then(response => {
          const departmentName = response.departmentName
          const department_id = departments.find(department => department.name === departmentName).id 
          connection.query('INSERT INTO role SET ?', {title: response.title, salary: response.salary, department_id}, (err, data) => {
            if(err) throw err 
            console.table(data)
            runPrompt();
        })    
    
    })

})
}

function viewRoles() {
  connection.query("SELECT * FROM role", (err, data) => {
    if(err) throw err
    console.table(data);
    runPrompt();
  })
}

function addEmployee() {

  connection.query('SELECT * FROM role', (err, roles) => {
    if(err) throw err
    var roleNames = roles.map(({title}) => title)

  connection.query('SELECT * FROM employee', (err, employees) => {
    if(err) throw err
    var employeeNames = employees.map(({first_name, last_name, id}) => ({name:`${first_name} ${last_name}`, value:id}))

    inquirer.prompt([
      {
        type: "input",
        name: "first_name",    
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "last_name",    
        message: "What is the employee's last name?"
      },
      {
        type: "list",
        name: "roleName",
        message: "What is the employee's role?",
        choices: roleNames
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the employee's manager?",
        choices: employeeNames 
      }
  ]).then(response => {
  
    const roleName = response.roleName 
    const manager_id = response.manager_id
    const role_id = roles.find(role => role.title === roleName).id
    connection.query('INSERT INTO employee SET ?', { first_name: response.first_name, last_name: response.last_name, role_id, manager_id}, (err, data) => {
        if (err) throw err
        console.table(data);
        runPrompt();
    })
  })
  }) 
})
}

function viewEmployees() {
    connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, 
    CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    `, (err, data) => {
        if(err) throw err
        console.table(data);
        runPrompt();
  })
}

function updateEmployeeRole() {
  
  connection.query('SELECT * FROM role', (err, roles) => {
    if(err) throw err
    var roleNames = roles.map(({title}) => title)

    connection.query('SELECT * FROM employee', (err, employees) => {
      if(err) throw err
      var employeeNames = employees.map(({first_name, last_name, id}) => ({name:`${first_name} ${last_name}`, value:id}))
 
      inquirer.prompt([
        {
            type: "list",
            name: "id",
            message: "which employee would you like to update?",
            choices: employeeNames
        }, 
        {
            type: "list",
            name: "roleName",
            message: "Select new role for employee?",
            choices: roleNames
        }
    ]).then(response => {
        const roleName = response.roleName 
        const id = response.id
        const role_id = roles.find(role => role.title === roleName).id
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [role_id, id], (err, data) => {
          if(err) throw err
          console.table(data);
          runPrompt();
        })
      })
    })
    })
  }
