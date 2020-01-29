const inquirer = require("inquirer");

function mainMenu() {
 inquirer.prompt(
  {
   message: "What would you like to do?",
   type: "rawlist",
   choices:
    [
     "Add departments, roles or employees",
     "View departments, roles or employees",
     "Update employee roles",
     "Quit"
    ],
   name: "task"
  }
 ).then(answer => {
  switch (answer.task) {
   case "Add departments, roles or employees":
    addItems();
    break;
   case "View departments, roles or employees":
    viewItems();
    break;
   case "Update employee roles":
    updateRoles();
    break;
   default:
    return;
  }
 });
}

function addItems() {
 inquirer.prompt(
  {
   message: "What would you like to add?",
   type: "rawlist",
   choices:
    [
     "Department",
     "Role",
     "Employee",
     "Done"
    ],
   name: "item"
  }
 ).then(answer => {
  switch (answer.item) {
   case "Department":
    addDepartment();
    break;
   case "Role":
    addRole();
    break;
   case "Employee":
    addEmployee();
    break;
   default:
    mainMenu();
  }
 });
}

async function viewItems() {
 const answer = await inquirer.prompt(
  {
   message: "What would you like to view?",
   type: "rawlist",
   choices:
    [
     "Departments",
     "Roles",
     "Employees"
    ],
   name: "item"
  }
 );

 console.log(`You chose to view ${answer.item}`);
}

async function updateRoles() {
 const answer = await inquirer.prompt(
  [
   {
    message: "Employee name (first last)?",
    name: "name"
   },
   {
    message: "What is the new role?",
    name: "role"
   }
  ]
 );

 console.log(`You want to change ${answer.name}'s role to ${answer.role}`);
}

function addDepartment() {
 inquirer.prompt(
  {
   message: "Department name?",
   name: "name"
  }
 ).then(answer => {
  insertNewDepartment(answer.name);
 });
}

// Start the program
mainMenu();