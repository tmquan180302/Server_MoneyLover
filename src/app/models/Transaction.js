const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = mongoose.Schema;

const transactionSchema = new schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        require: true
    },
    type: {
        type: Number,
        require: true
    },
    day: {
        type: String,
        require: true
    },
    note: {
        type: String,
        require: true
    },
    price: {
        type: String,
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
    overrideMethods: 'all',
});


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;