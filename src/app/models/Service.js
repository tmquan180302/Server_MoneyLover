const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const moment = require('moment-timezone');


const schema = mongoose.Schema;

const serviceSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: true
    },
    time: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    createdAt: String,
    updatedAt: String,

},
    {
        timestamps: { currentTime: () => moment().tz('Asia/Ho_Chi_Minh').format() },

    });

serviceSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;