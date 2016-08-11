import {Todo} from './todo-model'

//curry the callback variable since all calls to mongoose functions expect a (err, todo) => {...} to occur
let callbackCurry = callback =>
    (err, todo) => callback(err, todo)

export function find(_id, userId, callback){
    //in es6, {_id, userId} -> {_id: _id, userId: userId}
    Todo.findOne({_id, userId}, callbackCurry(callback))
}

export function add(todo, userId, callback){
    let newTodo = new Todo(todo)
    //ideally, this would be handled with other logic in a seperate business module
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
