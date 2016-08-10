import {Todo} from './todo-model'

export function find(id, callback){
    Todo.findById(id, (err, todo) => { callback(todo) })
}

export function add(todo, callback){
    let newTodo = new Todo(todo);
    newTodo.save((err, todo) => callback(err || todo)/*todo will be shadowed here from the arrow function param*/)
}
