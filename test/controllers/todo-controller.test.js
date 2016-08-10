import chai from 'chai'
import should from 'should'
import request from 'supertest'
import {init} from '../../init-app'

init(true)

import {app} from '../../init-app'
let expect = chai.expect
let deepEqual = chai.deepEqual

const ONE_DAY = 86400000

//var TodoModel = require('../../app/data/todo-model')

describe('TodoController testing', () => {
	describe('Insert Todo Test', () => {
		it('Should add todo', (done) =>{
            let insertTodo = sample
            request(app)
                .post('/api/todo')
                .send(insertTodo)
                .expect(200)
                .end((err, res) => {
                    if(err) {
                        done(err)
                    } else {
                        res.body.should.have.property('todo').with.property('_id')
                        done()
                    }
                })
		})
	})

	describe('Get Todo Test', () => {
		it('Should get todo', (done) => {
            //first insert todo
            //then try 'getting' it
            let insertTodo = sample
            request(app)
                .post('/api/todo')
                .send(insertTodo)
                .expect(200)
                .end((err, res) => {
                    if(err) {
                        done(err)
                    } 
                    else {
                        res.body.should.have.property('todo').with.property('_id')

                        request(app)
                            .get('/api/todo')
                            .query('id='+res.body.todo._id)
                            .expect(200)
                            .end((err, res) => {
                                if(err) {
                                    done(err)
                                } else {
                                    //yes, the following is ugly
                                    //unfortunately, there is not way to do 'properties' chaining
                                    //see: https://github.com/chaijs/chai/issues/72
                                    expect(res.body)
                                        .to.have.property('todo')
                                        .with.property('text', 'test')
                                    expect(res.body)
                                        .to.have.property('todo')
                                        .with.property('userId', 1)

                                    done()
                                }
                            })
                    }
                })
		})
	})

	describe('Update Todo Test', () => {
		it('Should update todo', (done) => {
            //first insert todo
            //then try updating it
            let insertTodo = sample
            request(app)
                .post('/api/todo')
                .send(insertTodo)
                .expect(200)
                .end((err, res) => {
                    if(err) {
                        done(err)
                    } 
                    else {
                        res.body.should.have.property('todo').with.property('_id')

                        let updateTodo = res.body.todo
                        updateTodo.text = 'update test'
                        updateTodo.completed = false

                        //need to set to Date object since it is current date string
                        updateTodo.added = new Date(updateTodo.added)
                        //add one day
                        updateTodo.added.setTime( updateTodo.added.getTime() + ONE_DAY);

                        request(app)
                            .put('/api/todo')
                            .send(updateTodo)
                            .expect(200)
                            .end((err, res) => {
                                if(err) {
                                    done(err)
                                } else {
                                    expect(res.body)
                                        .to.have.property('todo')
                                        .with.property('text', 'update test')
                                    expect(res.body)
                                        .to.have.property('todo')
                                        .with.property('completed', false)
                                    expect(res.body)
                                        .to.have.property('todo')
                                        .with.property('added',  new Date(sample.added.getTime() + ONE_DAY).toISOString()) 

                                    done()
                                }
                            })
                    }
                })
		})
	})

	describe('Delete Todo Test', () => {
		it('Should delete todo', (done) => {
            //first insert todo
            //then try deleting it
            let insertTodo = sample
            request(app)
                .post('/api/todo')
                .send(insertTodo)
                .expect(200)
                .end((err, res) => {
                    if(err) {
                        done(err)
                    } 
                    else {
                        res.body.should.have.property('todo').with.property('_id')

                        let deleteTodoId = res.body.todo._id
                        request(app)
                            .delete('/api/todo')
                            .query('id='+deleteTodoId)
                            .expect(200)
                            .end((err, res) => {
                                if(err) {
                                    done(err)
                                } else {
                                    expect(res.body)
                                        .to.have.property('status', true)

                                    done()
                                }
                            })
                    }
                })
		})
	})
})

let sample = {
    added: new Date('08-04-2016'),
    userId: 1,
    text: 'test',
    completed: true
}
