const userRouter = require('./user');
const transactionRouter = require('./transaction');
const categoryRouter = require('./category');
const budgetRouter = require('./budget');
const balanceRouter = require('./balance');


function route(app) {
    app.use('/user', userRouter);
    app.use('/transaction', transactionRouter);
    app.use('/category', categoryRouter);
    app.use('/budget', budgetRouter);
    app.use('/balance', balanceRouter);

}

module.exports = route;