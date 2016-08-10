import {GetTodo, PostTodo, PutTodo} from './controllers/todo-controller'

export function router(app){
	app.get('/api/todo', GetTodo);

	app.post('/api/todo', PostTodo);

	app.put('/api/todo', PutTodo);
}
