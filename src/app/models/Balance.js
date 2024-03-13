const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const moment = require('moment-timezone');


const schema = mongoose.Schema;

const balanceSchema = new schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: String,
    updatedAt: String,

},
    {
        timestamps: { currentTime: () => moment().tz('Asia/Ho_Chi_Minh').format() },

    });

balanceSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;