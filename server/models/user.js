const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require("lodash")
const bcrypt = require("bcryptjs");
var UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            messagbe: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]

})


UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ["_id", "email"])
};
UserSchema.methods.generateAuthToken = function () {
    var access = 'auth';
    var user=this;
    var token = jwt.sign({ _id: user._id, access }, 'abc123');
    user.tokens = user.tokens.concat([{ access, token }]);
    return user.save().then(() => {
        return token;
    })
}



UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;


    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

UserSchema.statics.findByCredentials = function (email, password) {
    //    console.log(this);

    var User = this;

    return userModel.findOne({ email }).then((user) => {

        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        })

    })
}




UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }


})

var userModel = new mongoose.model('userModel', UserSchema);

module.exports = { userModel }