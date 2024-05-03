const userRouter = require('./api/user');
const transactionRouter = require('./api/transaction');
const categoryRouter = require('./api/category');
const budgetRouter = require('./api/budget');
const balanceRouter = require('./api/balance');
const billRouter = require('./api/bill');
const serviceRouter = require('./api/service');


const serviceWebRouter = require('./web/service');
const userWebRouter = require('./web/user');
const billWebRouter = require('./web/bill');
const transactionWebRouter = require('./web/transaction');
const { checkAdmin } = require('../middlewares/auth');





function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/transaction', transactionRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/budget', budgetRouter);
    app.use('/api/balance', balanceRouter);
    app.use('/api/bill', billRouter);
    app.use('/api/service', serviceRouter);


    app.get('/', checkAdmin, (req, res) => {
        res.redirect('/bill/dashboard');
    })

    app.use('/user', userWebRouter);
    app.use('/service', serviceWebRouter);
    app.use('/bill', billWebRouter);
    app.use('/transaction', transactionWebRouter);






}

module.exports = route;