import {GetTodo, PostTodo} from './controllers/todo-controller'

export function router(app){
	app.get('/api/todo', GetTodo);

	app.post('/api/todo', PostTodo);
}
