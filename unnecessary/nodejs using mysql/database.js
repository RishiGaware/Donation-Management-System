import mysql from "mysql2"
import dotenv  from "dotenv"
dotenv.config()
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

export async function getNotes(){
  const [rows] = await pool.query("select * from notes")
  return rows
}

export async function getNote(id){
  const [rows] = await pool.query(`
  SELECT * FROM notes 
  where id = ?`,[id]);
  return rows[0];
}

export async function insertNote(title , content){
  const [result] = await pool.query(`insert into notes(title,contents) 
  values(? , ?)`,[title,content]);
  const id = result.insertId;
  return getNote(id);
}

const note = await insertNote("Third Note" , "Java notes");
console.log(note);

