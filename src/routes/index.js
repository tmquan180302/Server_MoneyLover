const userRouter = require('./api/user');
const transactionRouter = require('./api/transaction');
const categoryRouter = require('./api/category');
const budgetRouter = require('./api/budget');
const balanceRouter = require('./api/balance');


function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/transaction', transactionRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/budget', budgetRouter);
    app.use('/api/balance', balanceRouter);

    
    



}

module.exports = route;