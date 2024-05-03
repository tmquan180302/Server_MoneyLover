const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const moment = require('moment-timezone');
const { repeatOptions } = require('../../utils/options');


const schema = mongoose.Schema;

const budgetSchema = new schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    category: {
        type: Object,
        require: true
    },
    dayStart: {
        type: Number,
        require: true
    },
    dayEnd: {
        type: Number,
        require: false,
        default: null
    },
    note: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    frequency: {
        type: String,
        enum: repeatOptions,
        default: 'Never'
    },
    createdAt: String,
    updatedAt: String,

},
    {
        timestamps: { currentTime: () => moment().tz('Asia/Ho_Chi_Minh').format() },
    }
);

budgetSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});


const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;   