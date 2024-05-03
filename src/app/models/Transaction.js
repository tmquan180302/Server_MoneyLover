const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const moment = require('moment-timezone');


const schema = mongoose.Schema;

const transactionSchema = new schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    category: {
        type: Object,
        require: true
    },
    day: {
        type: Number,
        require: true
    },
    note: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    createdAt: String,
    updatedAt: String,
},
    {
        timestamps: { currentTime: () => moment().tz('Asia/Ho_Chi_Minh').format() },
    });

transactionSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true,

});


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;