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

function quit() {
 connection.end();
}

/*
async function addEmployee() {
 answer = await inquirer.prompt(
  [
   {
    message: "Enter employee first name.",
    name: "firstName"
   },
   {
    message: "Enter employee last name.",
    name: "lastName"
   }
  ]
 );
 console.log(`Added ${ answer.firstName } ${ answer.lastName }`);
}

// Functions that select

async function viewDepartment() {
 answer = await inquirer.prompt(
  {
   message: "Enter name of department to add.",
   name: "department"
  }
 );
 console.log(`Added ${ answer.department }`);
}

async function addRole() {
 answer = await inquirer.prompt(
  {
   message: "Enter name of role to add.",
   name: "role"
  }
 );
 console.log(`Added ${ answer.role }`);
}

async function addDepartment() {
 answer = await inquirer.prompt(
  {
   message: "Enter name of department to add.",
   name: "department"
  }
 );
 console.log(`Added ${ answer.department }`);
}
*/
