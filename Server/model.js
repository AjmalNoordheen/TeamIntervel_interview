const db = require("./db");

//==== switch 'tasklist' database for the rest of your application ==========
db.changeUser({ database: "tasklist" }, (err) => {
  if (err) {
    console.error("Error switching to tasklist database: " + err.stack);
    return;
  }
  console.log('Switched to "tasklist" ');
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    heading VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    date DATE,
    time TIME,
    priority VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

console.log("model is here");
db.query(createTableQuery, (err) => {
  if (err) {
    console.log("model Erro");
    console.error('Error creating "tasks" table: ' + err.stack);
  } else {
    console.log('Table "tasks" created');
  }
});

module.exports = db;
