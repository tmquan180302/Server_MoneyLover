const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://quantmph19466:nmQ85mOdyZh0qDnU@cluster0.qiz9d1q.mongodb.net/moneyLover?retryWrites=true&w=majority', {});
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };