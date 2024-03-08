const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const moment = require('moment-timezone');

const schema = mongoose.Schema;

const categorySchema = new schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    type: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    icon: {
        type: Number,
        require: true
    },
    color: {
        type: Number,
        require: true
    },
    createdAt: String,
    updatedAt: String,
},
    {
        timestamps: { currentTime: () => moment().tz('Asia/Ho_Chi_Minh').format() },
    });

categorySchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;