import {find, add, update, remove} from '../../data/todo-agent'

export function GetTodo(req, res, next){
    find(req.query.id, responseCallback(res))
}

export function PostTodo(req, res, next){
    add(req.body, responseCallback(res))
}

export function PutTodo(req, res, next){
    update(req.body, responseCallback(res))
}

export function DeleteTodo(req, res, next){
    remove(req.query.id, responseCallback(res))
}

//curried 
let responseCallback = res => 
    (err, todo) => {
        if(err){
            res.json({status: false, error: err.message})
        }
        else{
            res.send({status: true, todo})
        }
    }
