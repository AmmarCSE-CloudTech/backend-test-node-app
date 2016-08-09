import mongoose from 'mongoose'
import chai from 'chai'
import {GetTodo, PostTodo} from '../../app/server/controllers/todo-controller'

let expect = chai.expect
let deepEqual = chai.deepEqual

var TodoModel = require('../../app/data/todo-model')

describe('TodoController testing', function () {
	describe('Insert Todo Test', function () {
		it('Should add todo', function (done) {
            let insertTodo = sample
            insertTodo = PostTodo(insertTodo)
            
            let actualTodo = GetTodo(insertTodo.id)

            assert.deepEqual(insertTodo, actualTodo)

            done()
		})
	})
})

let sample = {
    added: Date.now,
    userId: 1,
    text: 'insert test'
}
