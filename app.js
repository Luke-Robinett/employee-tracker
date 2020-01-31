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
      pageSize: 20,
      choices:
        [
          "Add department",
          "Add role",
          "Add employee",
          new inquirer.Separator(),
          "View departments",
          "View roles",
          "View employees",
          new inquirer.Separator(),
          "Update employee roles",
          new inquirer.Separator(),
          "Quit"
        ]
    }
  ).then(answer => {
    switch (answer.task) {
      case "Add department":
        addDepartment();
        break;
      case "Add role":
        addRole();
        break;
      case "Add employee":
        addEmployee();
        break;

      case "View departments":
        viewDepartments();
        break;
      case "View roles":
        viewRoles();
        break;
      case "View employees":
        viewEmployees();
        break;
      default:
        quit();
    }
  });
}

// Insert functions

function addDepartment() {
  inquirer.prompt(
    {
      message: "Enter name of department to add.",
      name: "name"
    }
  ).then(answer => {
    connection.query("insert into department (name) values (?)", answer.name, (err, result) => {
      if (err) throw err;
      console.log(`${result.affectedRows} row(s) inserted.`);
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
  connection.query("select id, title from role", (err, roles) => {
    if (err) throw err;
    connection.query("select id, concat(first_name, ' ', last_name) as name from employee", (err, employees) => {
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
        connection.query("insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)", [answers.firstName, answers.lastName, answers.role, answers.manager.value], (err, result) => {
          if (err) throw err;
          console.log(`${result.affectedRows} row(s) inserted.`);
          start();
        });
      });
    });
  });
}

// Select functions

function viewDepartments() {
  connection.query("select * from department", (err, result) => {
    if (err) throw err;
    console.table(result);
    start();
  });
}

function viewRoles() {
  const queryText = "select role.id, title, salary, department.name " +
    "from role " +
    "inner join department on role.department_id = department.id";
  connection.query(queryText, (err, result) => {
    if (err) throw err;
    console.table(result);
    start();
  });
}

function viewEmployees() {
  const queryText = "select employee.id, employee.first_name, employee.last_name, role.title, concat(manager.first_name, ' ', manager.last_name) as manager " +
    "from employee " +
    "inner join role on employee.role_id = role.id " +
    "left join employee as manager on employee.manager_id = manager.id";
  connection.query(queryText, (err, result) => {
    if (err) throw err;
    console.table(result);
    start();
  });
}

function quit() {
  connection.end();
}
