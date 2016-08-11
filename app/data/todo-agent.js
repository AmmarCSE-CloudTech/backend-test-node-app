import {Todo} from './todo-model'

export function find(_id, userId, callback){
    Todo.findOne({_id, userId}, callbackCurry(callback))
}

export function add(todo, userId, callback){
    let newTodo = new Todo(todo)
    newTodo.userId = userId
    newTodo.save(callbackCurry(callback))
}

export function update(updateTodo, userId, callback){
    Todo.findOne({_id: updateTodo._id, userId}, (err, todo) => {
        //perhaps some sort of javascript 'mapper' would be useful here
        todo.completed = updateTodo.completed;
        todo.text = updateTodo.text;
        todo.added = updateTodo.added;

        todo.save(callbackCurry(callback))
    });
}

export function remove(id, userId, callback){
    Todo.remove({_id : id, userId }, callbackCurry(callback))
}

let callbackCurry = callback =>
    (err, todo) => callback(err, todo)
