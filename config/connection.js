const mysql = require("mysql2/promise");
require("dotenv").config();

let db;
// Connect to database
const getConnection = async () => {
  if (db) return db;

  db = await mysql.createConnection(
    {
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the employee_mgmt database.`)
  );
  return db;
};

const closeConnection = async () => {
  if (db) {
    await db.end();
  }
};
module.exports = { getConnection, closeConnection };
