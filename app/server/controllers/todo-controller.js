import {find, add} from '../../data/data-agent'

export function GetTodo(req, res, next){
    find(req.params.todo_id, todo => res.send('Hellow world'))
}

export function PostTodo(req, res, next){
    add(req.body, result => {
            if(result._id){
                res.send({status: true, todo: result})
            }
            else{
                res.json({status: false, error: err.message})
            }
        }
    )
}
