import { findData, findDataById } from '../models/todoModel.js';


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
            res.writeHead('Access-Control-Allow-Origin')
            res.end(JSON.stringify({ meassage : 'Todo not found!'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(todo))
        }
        
    } catch (err) {

    }
}