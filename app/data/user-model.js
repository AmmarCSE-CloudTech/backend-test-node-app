import mongoose from 'mongoose'
let Schema = mongoose.Schema

const UserSchema = new Schema({
	name: { type: String },
	password: { type: String }
})

export let User = mongoose.model('User', UserSchema)

