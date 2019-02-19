const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require("../models/todo");
const { userModel } = require("../models/user");
const { ObjectID } = require('mongodb')

const { todos, populateTodos, users, populateUsers } = require("./seed/seed");

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('Post/todos', () => {
    it('should create one todo ', (done) => {
        //  console.log("zzzzzzzzzzz");
        var text = "Test todo text";

        request(app)
            .post('/todos')
            .send({ firstName: text })
            .expect(200)
            .expect((res) => {
                //      console.log('``````````````');
                //    console.log(JSON.stringify(res.body));
                // console.log('###########');
                expect((res.body.firstName)).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                //  console.log('START find');
                Todo.find({ firstName: text }).then((todos) => {
                    //    console.log('FIND SUCCESS');
                    //     console.log(JSON.stringify(todos));
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

describe('GET todos/id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.firstName).toBe(todos[0].firstName)
            })
            .end(done);
    })


    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done)
    })

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done)
    })
})


describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).not.toBeTruthy();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done);
    });
});


describe('GET /users/me', () => {
    it('shold return if user authticate', (done) => {

        request(app)
            .get("/users/me")
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);

    });

    it('shold return 401 if user not authticate', (done) => {
        request(app)
            .get("/users/me")
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
})


describe("post /users", () => {

    it("shold create a user", (done) => {
        var email = "h3@yopmail.com";
        var password = "ilink@2012";
        request(app)
            .post("/users")
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {

                if (err) {
                    return done(err);
                }

                userModel.findOne({ email }).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
                }).catch((err) => done(err));
            });
    })


    it("should retrun validation errors if request invalid", (done) => {
        request(app)
            .post("/users")
            .send({ email: "45@DF", password: 123 })
            .expect(400)
            .end(done);

    })


    it("shold not create user if email in use", (done) => {
        request(app)
            .post("/users")
            .send({ email: users[0].email, password: "ilink@1234563" })
            .expect(400)
            .end(done);

    })

})

describe("post /users/login", () => {

    it("should user login and retun auth token", (done) => {
        request(app)
            .post("/users/login")
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.header['x-auth']).toBeTruthy();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                userModel.findById(users[1]._id).then((user) => {
                    expect(user.tokens[0]).toMatchObject({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((err) => done(err));
            })
    })

    it("should reject invalid token", (done) => {
        request(app)
            .post("/users/login")
            .send({
                email: "h2@yopmail.com",
                passsword: "asa123"
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end((err, res) => {
                userModel.findById(users[1]._id).then((user) => {
                    console.log(user);
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            })
    })
})


