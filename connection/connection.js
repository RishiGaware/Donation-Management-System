
// import mysql from "mysql2"
const mysql = require("mysql2")

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'project'
  });

  connect.connect((error) =>{
    if (error)
        console.log("Error while connecting to DB");
    else
        console.log("Database connected Successfully");
  });


  module.exports = connect;
