import {add} from '../../data/user-agent'
import {jwt} from 'jsonwebtoken'

export function Register(req, res, next){
    add(req.body, responseCallback(res))
}

export function SignIn(req, res, next){
    (err, user) => {
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
            let token = jwt.sign(user, app.get('tokenSecret'), {
              expiresInMinutes: 1440 // expires in 24 hours
            })
            res.json({status: true, token})
        }
    }
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
