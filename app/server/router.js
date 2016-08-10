import {GetTodo, PostTodo, PutTodo, DeleteTodo} from './controllers/todo-controller'

export function router(app){
	app.get('/api/todo', GetTodo);

	app.post('/api/todo', PostTodo);

	app.put('/api/todo', PutTodo);

	app.delete('/api/todo', DeleteTodo);
}
