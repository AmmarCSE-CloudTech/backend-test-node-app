import express from 'express'
import {Register, SignIn} from '../controllers/account-controller'
import {GetTodo, PostTodo, PutTodo, DeleteTodo} from '../controllers/todo-controller'
import authenticate from './authenticator'

export function routeAccount(app){
	app.get('/account/register', Register);

	app.post('/account/signin', SignIn);
}

export function routeApi(app){
    let apiRoutes = express.Router()

    //explicitly route api with authenticator to have only the api routes authenticated
    apiRoutes.use(authenticate)

	apiRoutes.get('/todo', GetTodo);

	apiRoutes.post('/todo', PostTodo);

	apiRoutes.put('/todo', PutTodo);

	apiRoutes.delete('/todo', DeleteTodo);

    //now attach authenticated routes to /api path
    app.use('/api', apiRoutes)
}
