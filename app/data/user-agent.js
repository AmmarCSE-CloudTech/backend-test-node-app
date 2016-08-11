import {User} from './user-model'

//curry the callback variable since all calls to mongoose functions expect a (err, todo) => {...} to occur
let callbackCurry = callback =>
    (err, user) => callback(err, user)

export function add(user, callback){
    let newUser = new User(user)
    //ideally, before saving, hashing would be performed on the password 
    //since storing the raw password is highly unrecommended
    newUser.save(callbackCurry(callback))
}

export function find(user, callback){
    User.findOne(user, callbackCurry(callback))
}
