import jwt from 'jsonwebtoken'
import {config} from '../../config'
import {add, find} from '../../data/user-agent'

//curry so that the 'res' object is available within the mongoose callback
let responseCallback = res => 
    (err, user) => {
        if(err){
            res.json({status: false, error: err.message})
        }
        else{
            res.send({status: true, user})
        }
    }

export function Register(req, res, next){
    add(req.body, responseCallback(res))
}

export function SignIn(req, res, next){
    find(req.body, (err, user) => {
        if(err){
            res.json({status: false, error: err.message})
        }
        else if(!user){
            res.json({status: false, error: 'Authentication failed. User not found.'})
        }
        else if(user.password != req.body.password){
            res.json({status: false, error: 'Authentication failed. Incorrect password.'})
        }
        //ok, were good
        else{
            let token = jwt.sign(user, config.tokenSecret, {
              expiresIn: 24*60*60 // expires in 24 hours
            })
            res.json({status: true, token})
        }
    })
}
