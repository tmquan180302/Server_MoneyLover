const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const moment = require('moment-timezone');


const schema = mongoose.Schema;

const userSchema = new schema({

    email: {
        type: String,
        require: true
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
    createdAt: String,
    updatedAt: String,

},
    {
        timestamps: { currentTime: () => moment().tz('Asia/Ho_Chi_Minh').format() },

    });

userSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

const User = mongoose.model('User', userSchema);

module.exports = User;