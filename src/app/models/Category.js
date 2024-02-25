const mongoose = require('mongoose');

const schema = mongoose.Schema;

const categorySchema = new schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    type: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    icon: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },

});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;