import jwt from 'jsonwebtoken'
import {config} from '../../config'

//es6, use default since this is the only exported function this module provides
export default function authenticate(req, res, next){
    //only allow tokens via limited methods or sources
    let token = req.body.token || req.query.token || req.headers['x-access-token']

    if(token){
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if(err){
                //this should be refactored to check the error more explicitly
                //i.e., it may not necessarily be an authentication failure
                return res.json({status: false, message: 'Token authentication failed.'})
            }

            //attach to request for later use and identification
            req.user = decoded._doc

            next()
        })
    }
    else{
        return res.status(403).send({
                status: false,
                message: 'Authentication required. No token provided.'
            })
    }
}
