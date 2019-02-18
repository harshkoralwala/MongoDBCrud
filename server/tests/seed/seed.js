var { ObjectID } = require("mongodb");
var { Todo } = require("../../models/todo");
const { userModel } = require("../../models/user");
const jwt = require("jsonwebtoken")

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: "h1@yopmail.com",
    password: "userOnePass",
    tokens: [{
        access: "auth",
        token: jwt.sign({ _id: userOneId, access: "auth" }, "abc123").toString()
    }]
}, {
    _id: userTwoId,
    email: "h2@yopmail.com",
    password: "userTwoPass"
}]


const todos = [{
    _id: new ObjectID(),
    firstName: "first"
}, {
    _id: new ObjectID(),
    firstName: "first 2"
}]


const populateTodos = (done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos)
    }, (err) => {
    }).then(() => done(), (err) => {

    });
}



const populateUsers = (done) => {
    userModel.remove({}).then(() => {
        var userOne = new userModel(users[0]).save();
        var userTwo = new userModel(users[1]).save();
        return Promise.all([userOne, userTwo])
    }).then(() => done(), (err) => {
        console.log(err);
    });
}

module.exports = {
    populateTodos,
    todos,
    populateUsers,
    users
}