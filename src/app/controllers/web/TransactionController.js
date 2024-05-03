const Transaction = require('../../models/Transaction');
const Budget = require('../../models/Budget');
const User = require('../../models/User');

const generateNewBudgets = require('../../../service/budget');

class TransactionController {


    //[GET] transaction/getAll
    async showList(req, res, next) {

        try {

            const transactions = await Transaction.find().populate('userId');
            const budgets = await Budget.find().populate('userId');
            const newBudget = generateNewBudgets(budgets);
            const merge = [...newBudget, ...transactions];


            const userArr = [];
            merge.forEach(item => {
                const existingUserIndex = userArr.findIndex(user => user.email === item.userId.email);
                if (existingUserIndex !== -1) {
                    userArr[existingUserIndex].transaction++;
                } else {
                    userArr.push({
                        _id: item.userId._id,
                        email: item.userId.email,
                        transaction: 1
                    });
                }
            });
            res.render("transaction/viewTransaction", {
                layout: "layouts/main",
                data: userArr,
                title: "Giao dịch người dùng",
            });
        } catch (error) {
            res.json(error);
        }
    }

    async showUserTransaction(req, res, next) {

        try {
            const user = await User.findOne({ _id: req.params.id });
            const transactions = await Transaction.find({ userId: req.params.id }).populate('userId');
            const budgets = await Budget.find({ userId: req.params.id }).populate('userId');
            const newBudget = generateNewBudgets(budgets);
            const merge = [...newBudget, ...transactions];

            newBudget.forEach(budget => {
                delete budget.dayEnd;
                if (budget.hasOwnProperty("dayStart")) {
                    budget.day = budget.dayStart;
                    delete budget.dayStart;

                }
            });

            res.render("transaction/viewUserTrans", {
                layout: "layouts/main",
                data: merge,
                user: user,
                title: "Giao dịch người dùng",
            });
        } catch (error) {
            res.json(error);
        }
    }

    async showDetailTransaction(req, res, next) {

        try {
            const transaction = await Transaction.findOne({ _id: req.params.id }).populate('userId');
            const budget = await Budget.findOne({ _id: req.params.id }).populate('userId');

            res.render("transaction/detailTransaction", {
                layout: "layouts/main",
                data: transaction ? transaction : budget,
                title: "Giao dịch người dùng",
            });
        } catch (error) {
            res.json(error);
        }
    }

    async showTrash(req, res, next) {

        try {
            const transaction = await Transaction.findDeleted({ userId: req.params.id }).populate('userId');

            res.render("transaction/viewTrash", {
                layout: "layouts/main",
                data: transaction,
                title: "Giao dịch người dùng",
            });
        } catch (error) {
            res.json(error);
        }
    }
    async restore(req, res, next) {

        try {
            await Transaction.findOneAndUpdateDeleted({ _id: req.params.id }, {deleted : false});
            res.redirect('back');
        } catch (error) {
            res.json(error);
        }
    }



}

module.exports = new TransactionController();

