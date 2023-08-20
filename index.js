import http from 'http'
import dotenv from 'dotenv'
dotenv.config()
import { getAllData, getTodo } from './controllers/todoController.js'

const server = http.createServer(async function (req, res) {
    // const data = await getTodo();

    if(req.url === '/api/todos') {
       getAllData(req,res)
    } else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getTodo(req, res, id)
    } 
    else {
        res.statusCode = 400;
        res.end('Not Found')
    }

})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`The server is running at ${PORT}`))