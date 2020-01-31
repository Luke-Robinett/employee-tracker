const inquirer = require("inquirer");
const mysql = require("mysql");

// Initialize database connection
const connection = mysql.createConnection({
 host: "localhost",
 user: "luke",
 password: "bootcamp",
 database: "cms_db"
});

connection.connect(err => {
 if (err) {
  return console.error('error connecting: ' + err.stack);
 }
 console.log('connected as id ' + connection.threadId);
 start();
});

// Main prompts
function start() {
 inquirer.prompt(
  {
   message: "What would you like to do?",
   type: "rawlist",
   name: "task",
   choices:
    [
     {
      name: "Add department",
      value: "addDepartment"
     },
     {
      name: "Add role",
      value: "addRole"
     },
     {
      name: "Add employee",
      value: "addEmployee"
     },
     {
      name: "Quit",
      value: "quit"
     }
    ]
  }
 ).then(answer => {
  switch (answer.task) {
   case "addDepartment":
    addDepartment();
    break;
   case "addRole":
    addRole();
    break;
   case "addEmployee":
    addEmployee();
    break;
   case "quit":
    quit();
  }
 });
}

// Functions that insert

function addDepartment() {
 inquirer.prompt(
  {
   message: "Enter name of department to add.",
   name: "name"
  }
 ).then(answer => {
  connection.query("insert into department (name) values (?)", answer.name, (err, result) => {
   if (err) throw err;
   console.log(result);
   start();
  });
 });
}

function addRole() {
 connection.query("select id, name from department", (err, result) => {
  inquirer.prompt(
   [
    {
     message: "Enter title of role to add.",
     name: "title"
    },
    {
     message: "Enter salary for role.",
     type: "number",
     name: "salary"
    },
    {
     message: "Which department does this role belong to?",
     type: "rawlist",
     name: "department",
     choices: result.map(dept => ({ name: dept.name, value: dept.id }))
    }
   ]
  ).then(answer => {
   connection.query("insert into role (title, salary, department_id) values (?, ?, ?)", [answer.title, answer.salary, answer.department.value], (err, result) => {
    if (err) throw err;
    console.log(`Inserted ${result.affectedRows} row(s)`);
    start();
   });
  });
 });
}

function addEmployee() {
 connection.query("select id, concat(first_name, ' ', last_name) as name from employee", (err, employees) => {
  if (err) throw err;
  connection.query("select id, title from role", (err, roles) => {
   if (err) throw err;
   inquirer.prompt(
    [
     {
      message: "Enter first name.",
      name: "firstName"
     },
     {
      message: "Enter last name.",
      name: "lastName"
     },
     {
      message: "Select role.",
      type: "rawlist",
      name: "role",
      choices: roles.map(r => ({ name: r.title, value: r.id }))
     },
     {
      message: "Does employee have a manager?",
      type: "confirm",
      name: "hasMgr"
     },
     {
      when: answ => answ.hasMgr,
      message: "Select manager.",
      type: "rawlist",
      name: "manager",
      choices: employees.map(emp => ({ name: emp.name, value: emp.id }))
     }
    ]
   ).then(answers => {
    connection.query("insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)", [answers.firstName, answers.lastName, answers.role, answers.manager], (err, result) => {
     if (err) throw err;
     console.log(`${result.affectedRows} row(s) inserted.`);
     start();
    });
   });
  });
 });
}

function quit() {
 connection.end();
}
