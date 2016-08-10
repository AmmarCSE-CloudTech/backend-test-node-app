import {find, add, update, remove} from '../../data/data-agent'

export function GetTodo(req, res, next){
    find(req.query.id, todo => res.send({status: true, todo}))
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

export function PutTodo(req, res, next){
    update(req.body, result => {
            if(result._id){
                res.send({status: true, todo: result})
            }
            else{
                res.json({status: false, error: err.message})
            }
        }
    )
}

export function DeleteTodo(req, res, next){
    remove(req.query.id, todo => res.send({status: true, todo}))
}
