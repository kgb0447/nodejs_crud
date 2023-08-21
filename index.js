import http from 'http'
import dotenv from 'dotenv'
import { createTodo, getAllData, getTodo, updateTodo } from './controllers/todoController.js'

dotenv.config();

const server = http.createServer(async function (req, res) {
    const regexp = /\/api\/todos\/([0-9]+)/;
    const regexpPUT = /\/api\/todos\/update\/([0-9]+)/;

    if(req.url === '/api/todos') {
       getAllData(req,res)

    } else if (req.url.match(regexp) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getTodo(req, res, id)

    } else if (req.url === '/api/todos/add' && req.method === 'POST') {
        createTodo(req,res)

    } else if (req.url.match(regexpPUT) && req.method === 'PUT') {
         const id = req.url.split('/')[4]
        updateTodo(req,res,id)
        
    } else {
        res.statusCode = 400;
        res.end('Not Found')
    }

})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`The server is running at ${PORT}`))