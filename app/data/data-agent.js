import {Todo} from './todo-model'

export function find(id, callback){
    Todo.findById(id, callbackCurry(callback))
}

export function add(todo, callback){
    let newTodo = new Todo(todo)
    newTodo.save(callbackCurry(callback))
}

export function update(updateTodo, callback){
    Todo.findById(updateTodo._id, (err, todo) => {
        //perhaps some sort of javascript 'mapper' would be useful here
        todo.completed = updateTodo.completed;
        todo.text = updateTodo.text;
        todo.added = updateTodo.added;

        todo.save(callbackCurry(callback))
    });
}

export function remove(id, callback){
    Todo.remove({_id : id }, callbackCurry(callback))
}

let callbackCurry = callback =>
    (err, todo) => callback(err, todo)
