import {add} from '../../data/user-agent'

export function Register(req, res, next){
    add(req.body, responseCallback(res))
}

//curried 
let responseCallback = res => 
    (err, user) => {
        if(err){
            res.json({status: false, error: err.message})
        }
        else{
            res.send({status: true, user})
        }
    }
