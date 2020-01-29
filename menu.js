const inquirer = require("inquirer");

function showMainMenu() {
 inquirer.prompt(
  {
   message: "What would you like to do?",
   type: "rawlist",
   name: "task",
   choices:
    [
     "Add departments, roles or employees",
     "View departments, roles or employees",
     "Update employee roles",
     "Quit"
    ]
  }
 ).then(answer => {
  switch (answer) {
   case "Add departments, roles or employees":
    showAddMenu();
    break;
   case "View departments, roles or employees":
    showViewMenu();
    break;
   case "Update employee roles":
    showUpdateRolesMenu();
    break;
   default:
    return;
  }
 });
}

function showAddMenu() {
 inquirer.prompt(
  {
   message: "What would you like to add?",
   type: "rawlist",
   name: "item",
   choices:
    [
     "Department",
     "Role",
     "Employee",
     "Done"
    ]
  }
 ).then(answer => {
  if (answer.item !== "Done") {
    showAddForm(answer.item);
  } else {
    showMainMenu();
  }
 });
}