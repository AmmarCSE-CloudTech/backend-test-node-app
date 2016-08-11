import {User} from './user-model'

export function add(user, callback){
    let newUser = new User(user)
    //ideally, before saving, hashing would be performed on the password 
    //since storing the raw password is highly unrecommended
    newUser.save(callbackCurry(callback))
}

let callbackCurry = callback =>
    (err, user) => callback(err, user)
