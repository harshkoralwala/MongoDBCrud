var mongoose = require('mongoose')
var Todo = mongoose.model("Todo", {

    firstName: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    lastName: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: false
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    }

});


module.exports = {
    Todo
}