var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { userModel } = require('./models/user');


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



app.listen(3000, () => {
    console.log("started on 3000 ");
});


module.exports={
    app
}