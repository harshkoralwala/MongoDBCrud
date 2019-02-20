const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { userModel } = require('./models/user');
var { ObjectID } = require('mongodb')
var { authenticate } = require("./middleware/authenticate")
var app = express();
const port = process.env.port || 3000;
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        firstName: req.body.firstName,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e)
    });

});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({ _creator: req.user._id }).then((todos) => {
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

app.post("/users", (req, res) => {
    var userBody = _.pick(req.body, ["email", "password"]);
    var user = new userModel(userBody);
    user.save().then((userRes) => {
        return user.generateAuthToken()
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }, (err) => {
        console.log(err);
        res.status(400).send(err);
    })
})


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
});


app.post("/users/login", (req, res) => {
    var userBody = _.pick(req.body, ["email", "password"]);

    userModel.findByCredentials(userBody.email, userBody.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })

        res.send(user);

    }).catch((err) => {
        res.status(400).send();
    });

})


app.delete('/users/me/token', authenticate, (req, res) => {

    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log("started on ", port);
});


module.exports = {
    app
}