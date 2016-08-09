import mongoose from 'mongoose'
let Schema = mongoose.Schema

const TodoSchema = new Schema({
	text: String,
	completed: { type:Boolean, default: false },
	added: { type: Date, default: Date.now }
})

export let Todo = mongoose.model('Todo', TodoSchema)

