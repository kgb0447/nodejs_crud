import { findData, findDataById, createData, updateData } from '../models/todoModel.js';


/**
 * @desccription:  Gets all the products
 * @route: /api/todos */
export const getAllData = async (req, res) => {
    try {
        const todos = await findData();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(todos))
    } catch (err) {
        console.log(err)
    }
}

/**
 * @description Gets a single todo based on the id that was provided
 * @param {*} req request param from http createServer
 * @param {*} res response param from http createServer
 * @param {*} id id from the input of the client
 */
export const getTodo = async (req, res, id) => {
    try {
        const todo = await findDataById(id);
        if(!todo) {
            res.writeHead(404, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({ meassage : 'Todo not found!'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(todo))
        }
        
    } catch (err) {
        console.log(err)
    }
}

export const createTodo = async (req,res) => {
    try {
            // Create a body for the payload
            let body = ''; //We need to initialize the body first
            req.on('data', (chunk) => {
               return body += chunk.toString();
            })
            
            req.on('end', async () => {
                const { title, description } = JSON.parse(body)
                const createdTodo = await createData({title,description});
                res.writeHead(201, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify(createdTodo))
            })
    } catch (err) {
        console.log(err)
    }
}


export const updateTodo = async (req,res,id) => {
    try {
            const data = await findDataById(id);
            if(!data) {
                req.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ meassage : 'Todo not found!'}));
            } else {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                })
               
                req.on('end', async () => {
                    const {title,description} = JSON.parse(body)
                    
                    const newTodod = {
                        _id: data._id,
                        newTitle: title || data.title,
                        newDesc: description || data.description
                    }
                    const updatedTodo = await updateData(newTodod);
                    res.writeHead(201, {'Content-Type': 'application/json'});
                    return res.end(JSON.stringify(updatedTodo))
                })
            }
    } catch (err) {
        console.log(err)
    }
}

// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City = 'Frankfurt'
// WHERE CustomerID = 1;