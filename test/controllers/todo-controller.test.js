import chai from 'chai'
import should from 'should'
import request from 'supertest'
import {init, app} from '../../init-app'

init(true)

let expect = chai.expect
let deepEqual = chai.deepEqual

//var TodoModel = require('../../app/data/todo-model')

describe('TodoController testing', function () {
	describe('Insert Todo Test', function () {
		it('Should add todo', function (done) {
            let insertTodo = sample
            request(app)
                .post('/api/todo')
                .send({body: insertTodo})
                .expect(200)
                .end(function(err, res){
                    if(err) {
                        done(err)
                    } else {
                        res.body.should.have.property('todo').with.property('_id')
                        done()
                    }
                })
		})
	})

})

let sample = {
    added: Date.now(),
    userId: 1,
    text: 'insert test'
}
