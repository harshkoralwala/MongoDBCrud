const { ObjectID } = require('mongodb')
const { mongoose } = require("../server/db/mongoose");
const { userModel } = require("../server/models/user");

var id = "6c5baeccb416690decc08cff";

console.log(ObjectID.isValid(id));

userModel.findById(id).then((user)=>{
    if(!user){
        return console.log('User not found')
    }
    console.log("user",user);
})



// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log("find", todos);
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log("findOne", todo);
// })

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log("Id not found")

//     }
//     console.log("findById", todo);
// }).catch((e) => { console.log(e) })