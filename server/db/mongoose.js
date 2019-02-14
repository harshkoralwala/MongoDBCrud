var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env, NODE_ENV || "mongodb://localhost:27017/Todos");



module.exports = {
    mongoose
}