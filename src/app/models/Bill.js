const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const moment = require('moment-timezone');


const schema = mongoose.Schema;

const billSchema = new schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    service: {
        type: Object,
        require: true
    },
    dayStart: {
        type: Number,
        require: true,
        default: moment().valueOf(),
    },
    createdAt: String,
    updatedAt: String,

},
    {
        timestamps: { currentTime: () => moment().tz('Asia/Ho_Chi_Minh').format() },

    });

billSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;