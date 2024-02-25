const mongoose = require('mongoose');

const schema = mongoose.Schema;

const budgetSchema = new schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        require: true
    },
    type: {
        type: String,
        require: true
    },
    dayStart: {
        type: String,
        require: true
    },
    dayEnd: {
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
    frequency: {
        type: String,
        require: true
    },
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;   