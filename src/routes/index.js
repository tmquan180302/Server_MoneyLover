const userRouter = require('./api/user');
const transactionRouter = require('./api/transaction');
const categoryRouter = require('./api/category');
const budgetRouter = require('./api/budget');
const balanceRouter = require('./api/balance');

const userWWebRouter = require('./web/user');
function route(app) {
    app.use('/user', userRouter);
    app.use('/transaction', transactionRouter);
    app.use('/category', categoryRouter);
    app.use('/budget', budgetRouter);
    app.use('/balance', balanceRouter);



    app.use('/web/user', userWWebRouter);



}

module.exports = route;