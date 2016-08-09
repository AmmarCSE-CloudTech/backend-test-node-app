import {Todo} from 'todo-model'

export function find(id, callback){
    Todo.findById(id, function(err, todo){
        callback(todo)
    }
}
