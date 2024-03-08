const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://quantmph19466:nmQ85mOdyZh0qDnU@cluster0.qiz9d1q.mongodb.net/moneyLover?retryWrites=true&w=majority', {}) 
        console.log('kết nối db thành công') 
    } catch (error) {
        console.log('kết nối db thất bại') 
    }

}

module.exports = { connect } 