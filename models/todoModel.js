import { createPool } from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const pool = createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE
}).promise();

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
