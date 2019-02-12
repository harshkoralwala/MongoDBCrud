var { ObjectID } = require('mongodb');
const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { userModel } = require("../server/models/user");



// Todo.remove({}).then((result) => {
//     console.log(result);
// })


Todo.findOneAndRemove({ _id: "5c62f19954df347b1d8c0d88" }).then((todo) => {
    console.log(todo);
})


// Todo.findByIdAndRemove("5c62f19954df347b1d8c0d88").then((todo) => {
//     console.log(todo);
// })