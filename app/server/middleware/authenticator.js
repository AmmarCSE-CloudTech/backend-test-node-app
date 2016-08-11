import {jwt} from 'jsonwebtoken'

export default function authenticate(req, res, next){
    //only allow tokens via limited methods or sources
    let token = req.body.token || req.query.token || req.headers['x-access-token']

    if(token){
        jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
            if(err){
                return res.json({status: false, message: 'Token authentication failed.'})
            }

            //attach to request for later use
            req.decoded = decoded
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
