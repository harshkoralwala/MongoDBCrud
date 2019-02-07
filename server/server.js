var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Todos");

// var Todo = mongoose.model("Todo", {

//     firstName: {
//         type: String,
//         required:true,
//         minLength:1,
//         trim:true
//     },
//     lastName: {
//         type: String,
//         default:null
//     },
//     isActive: {
//         type: Boolean,
//         default:false
//     }
// });


// var newTodo = new Todo({
//     firstName:"firstName"
// });


// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc)
// }, (e) => {
//     console.log("unable to save todo",e) ;
// });



var userModel = new mongoose.model('userModel', {

    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    }
});

var userObj = new userModel({
    email: "h@h.com"
})

userObj.save().then((doc) => {
    console.log('Saved User', doc)
}, (e) => {
    console.log("unable to save User", e);
});