const mysql = require("mysql");

// Define database connection
const connection = mysql.createConnection(
 {
  host: "localhost",
  user: "luke",
  password: "bootcamp",
  database: "cms_db"
 }
);

// Connect to database
connection.connect(function (err) {
 if (err) {
  console.error('error connecting: ' + err.stack);
  return;
 }
 console.log('connected as id ' + connection.threadId);
});

// Functions for interacting with database

function insertDepartment(name) {
 const queryText = "insert into department (name) values (?);";
 connection.query(queryText, name, (err, data) => {
  if (err) {
   throw(err);
  }
  console.log(`Inserted ID ${data.insertedId} into department.`);
 }
}

function insertRole(title, salary, departmentId) {
 const queryText = "insert into role (title, salary, department_id) values (?, ?, ?);";
 connection.query(queryText, [title, salary, departmentId], (err, data) => {
  if (err) {
   throw(err);
  }
  console.log(`Inserted ID ${data.insertedId} into role.`);
 }
}

function insertEmployee(firstName, lastName, roleId, managerId) {
 const queryText = "insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?);";
 connection.query(queryText, [firstName, lastName, roleId, managerId], (err, data) => {
  if (err) {
   throw(err);
  }
  console.log(`Inserted ID ${data.insertedId} into employee.`);
 }
}

function selectDepartments(name) {
 const queryText = "select * from department";
 if (name) {
  queryText += "where name = ?";
 }
 connection.query(queryText, name, (err, data) => {
  if (err) {
   throw(err);
  }
  console.log(`Inserted ID ${data.insertedId} into department.`);
 }
}

function selectRoles(title) {
 const queryText = "select * from department";
 if (name) {
  queryText += "where name = ?";
 }
 connection.query(queryText, name, (err, data) => {
  if (err) {
   throw(err);
  }
  console.log(`Inserted ID ${data.insertedId} into department.`);
 }
}
