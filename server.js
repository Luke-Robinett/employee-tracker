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
