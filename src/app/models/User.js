const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({

    email: {
        type: String,
        require: true,
    },
    passWord: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        required: false
    },
    role: {
        type: String,
        required: false,
        default: 'user'
    },


});

const User = mongoose.model('User', userSchema);

module.exports = User;