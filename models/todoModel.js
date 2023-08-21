import { createPool } from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

/**
 * @desc creates a connection between the mySQL server and the node
 * 
 */
const pool = createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE
}).promise(); //this makes the object return a promise

export const findData = async () => {
    try {
        const [row] = await pool.query('SELECT * FROM todo.todos')
       
        return row
    } catch (err) {
        console.log(err)
    }
    
}

export const findDataById = async (id) => {
    try {
        const [row] = await pool.query(`
            SELECT * 
            FROM todo.todos 
            WHERE _id = ?
            `,[id])
        return row[0]
    } catch (err) {
        console.log(err)
    }
}

export const createData = async ({title,description}) => {
    try {
        const result = await pool.query(`
            INSERT INTO todo.todos (title, description)
            VALUES (?, ?)
            `, [title,description])
        return result
    } catch (err) {
        console.log(err)
    }
}


export const updateData = async ({_id,newTitle,newDesc}) => {
    try {
        const result = await pool.query(`
            UPDATE todo.todos
            SET title = ?,  description = ?
            WHERE _id = ? `,[newTitle, newDesc, _id])
        return result
    } catch (err) {
        console.log(err)
    }
}