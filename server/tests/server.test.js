const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require("../models/todo");
const { ObjectID } = require('mongodb')

const todos = [{
    _id: new ObjectID(),
    firstName: "first"
}, {
    _id: new ObjectID(),
    firstName: "first 2"
}]





// beforeEach((done) => {
//     Todo.remove({}).then(() => {
//         return Todo.insertMany(todos)
//     }).then(() => done())
// });
// describe('Post/todos', () => {
//     it('should create one todo ', (done) => {
//         var text = "Test todo text";

//         request(app).
//             post('/todos').
//             send({ firstName: text })
//             .expect(200)
//             .expect((res) => {
//                 //  console.log('``````````````');
//                 // console.log(JSON.stringify(res));
//                 // console.log('###########');
//                 expect(JSON.parse(res.text).firstName).toBe(text);
//             })
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 Todo.find({ firstName: text }).then((todos) => {
//                     //   console.log(todos);
//                     expect(todos.length).toBe(1);
//                     expect(todos[0].firstName).toBe(text);
//                     done()

//                 }).catch((e) => {
//                     done(e)
//                 })
//             })

//     });


//     it('shold not create todo with invalid body data', (done) => {
//         request(app)
//             .post('/todos')
//             .send({

//             })
//             .expect(400)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }

//                 Todo.find().then((todos) => {
//                     expect(todos.length).toBe(2);
//                     done()
//                 }).catch((e) => done(e));
//             })
//     });
// });



// describe('get /todos', () => {
//     it('should get all todos', (done) => {
//         request(app)
//             .get('/todos')
//             .expect(200)
//             .expect((res) => {
//                 //console.log(res);
//                 expect(res.body.todos.length).toBe(2)
//             })
//             .end(done)
//     })
// })

// describe('GET todos/id', () => {
//     it('should return todo doc', (done) => {
//         request(app)
//             .get(`/todos/${todos[0]._id.toHexString()}`)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.firstName).toBe(todos[0].firstName)
//             })
//             .end(done);
//     })


//     it('should return 404 if todo not found', (done) => {
//         request(app)
//             .get(`/todos/${new ObjectID().toHexString()}`)
//             .expect(404)
//             .end(done)
//     })

//     it('should return 404 for non-object ids', (done) => {
//         request(app)
//             .get(`/todos/123`)
//             .expect(404)
//             .end(done)
//     })
// })

describe('delete /todos/:id', () => {
    it('should remove todo', (done) => {
        request(app)
            .delete(`/todos/5c62f77f54df347b1d8c0fec`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe("5c62f77f54df347b1d8c0fec");

            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById("5c62f58e54df347b1d8c0f0e").then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((err) => done(err))
            })

        it('should remove 404 if todo not found', (done) => {

        })

        it('should retun 404 if object id is invalid todo', (done) => {

        })
    })
});