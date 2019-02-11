const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require("../models/todo");


const todos = [{
    firstName: "first"
}, {
    firstName: "first 2"
}]





beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done())
});
describe('Post/todos', () => {
    it('should create one todo ', (done) => {
        var text = "Test todo text";

        request(app).
            post('/todos').
            send({ firstName: text })
            .expect(200)
            .expect((res) => {
                //  console.log('``````````````');
                // console.log(JSON.stringify(res));
                // console.log('###########');
                expect(JSON.parse(res.text).firstName).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ firstName: text }).then((todos) => {
                    //   console.log(todos);
                    expect(todos.length).toBe(1);
                    expect(todos[0].firstName).toBe(text);
                    done()

                }).catch((e) => {
                    done(e)
                })
            })

    });


    it('shold not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({

            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done()
                }).catch((e) => done(e));
            })
    });
});



describe('get /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                //console.log(res);
                expect(res.body.todos.length).toBe(2)
            })
            .end(done)
    })
})
