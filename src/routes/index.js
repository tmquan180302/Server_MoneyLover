const userRouter = require('./api/user');
const transactionRouter = require('./api/transaction');
const categoryRouter = require('./api/category');
const budgetRouter = require('./api/budget');
const balanceRouter = require('./api/balance');
const billRouter = require('./api/bill');
const serviceRouter = require('./web/service');
const userWebRouter = require('./web/user');


function route(app) {
    app.use('/user', userRouter);
    app.use('/transaction', transactionRouter);
    app.use('/category', categoryRouter);
    app.use('/budget', budgetRouter);
    app.use('/balance', balanceRouter);
    app.use('/bill', billRouter);



    app.use('/web/user', userWebRouter);
    app.use('/web/service', serviceRouter);




}

module.exports = route;