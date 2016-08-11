import {find, add, update, remove} from '../../data/todo-agent'

//curry so that the 'res' object is available within the mongoose callback
let responseCallback = res => 
    (err, todo) => {
        if(err){
            res.json({status: false, error: err.message})
        }
        else{
            res.send({status: true, todo})
        }
    }

//all uses of req.user._id is possible since it has been attached in the authenticate middleware function

export function GetTodo(req, res, next){
    find(req.query.id, req.user._id, responseCallback(res))
}

export function PostTodo(req, res, next){
    let todo = req.body
    add(req.body, req.user._id, responseCallback(res))
}

export function PutTodo(req, res, next){
    update(req.body, req.user._id, responseCallback(res))
}

export function DeleteTodo(req, res, next){
    remove(req.query.id, req.user._id, responseCallback(res))
}
