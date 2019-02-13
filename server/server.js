const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { userModel } = require('./models/user');
var { ObjectID } = require('mongodb')

var app = express();
const port = process.env.port || 3000;
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
            res.status(404).send();
        }
        res.send(todo)
    })
})

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findByIdAndRemove({ _id: id }).then((doc) => {
        if (!doc) {
            res.status(404).send();
        }
        res.status(200).send(doc);
        console.log(res);
    }, (error) => {
        res.status(400).send();
    })
});


app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    var body = _.pick(req.body, ['firstName']);
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    body.isUpdated = true;

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo)
    }, (err) => {
        res.status(400).send();
    })

});


app.listen(port, () => {
    console.log("started on ", port);
});


module.exports = {
    app
}