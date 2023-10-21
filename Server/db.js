const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "123456",
};

const db = mysql.createConnection(dbConfig);

// ===========  Connect to the db =============
db.connect((err) => {
  if (err) {
    console.error("Database connection error: " + err.stack);
    return;
  }
  console.log("Connected to the database");

  //============  Create the  database ===========

  db.query("CREATE DATABASE IF NOT EXISTS tasklist", (err) => {
    if (err) {
      console.error("Error creating database: " + err.stack);
      return;
    }
  });
});

module.exports = db;
