import {find} from '../data/data-agent'

export function GetTodo(req, res, next){
    find(req.params.todo_id, todo => res.json({status: true, todo}))
}

export function PostTodo(req, res, next){
}
