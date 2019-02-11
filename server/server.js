var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { userModel } = require('./models/user');
var { ObjectID } = require('mongodb')

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        firstName: req.body.firstName
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e)
    });


    console.log(req.body);
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (error) => {
        res.status(400).send(error);
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(req.params.id)) {
        res.status(404).send();
    }
    Todo.findById(req.params.id).then((todo) => {
        if (!todo) {
            res.status(400).send();
        }
        res.send(todo)
    })
})


app.listen(3000, () => {
    console.log("started on 3000 ");
});


module.exports = {
    app
}