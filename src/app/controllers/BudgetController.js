const { repeatOptions } = require('../../util/options');
const Budget = require('../models/Budget');
const moment = require('moment-timezone');
const Transaction = require('../models/Transaction');


class BudgetController {


    //[GET] budget/getAll
    async showAll(req, res, next) {

        try {
            const data = await Budget.find({ userId: req.userId });
            res.json(data)
        } catch (err) {
            console.error('Error fetching budget:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    // [GET] budget/:id
    async show(req, res, next) {

        try {
            const budget = await Budget.findOne(req.params.id);
            res.json(budget)
        } catch (err) {
            console.error('Error fetching budget:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }


    //[POST] budget/create
    async create(req, res, next) {

        const { category, type, dayStart, dayEnd, note, price, frequency } = req.body;
        const budget = new Budget({
            user: req.user._id,
            category: category,
            type: type,
            dayStart: dayStart,
            dayEnd: dayEnd,
            note: note,
            price: price,
            frequency: frequency

        });

        try {
            const newBudget = await budget.save();
            res.status(201).json(newBudget);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    }

    //[POST] transaction/update/:id
    async update(req, res, next) {
        const id = req.params.id;
        const { category, type, dayStart, dayEnd, note, price, frequency } = req.body;
        const data = {
            category: category,
            type: type,
            dayStart: dayStart,
            dayEnd: dayEnd,
            note: note,
            price: price,
            frequency: frequency
        }

        try {
            const newbudget = await Budget.findOneAndUpdate(id, data, { new: true });
            res.json(newbudget);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    }

    //[DELETE] transaction/delete

    async destroy(req, res, next) {

        try {
            const id = req.params.id;
            const deletedBudget = await Budget.delete({ _id: id }, { new: true });
            res.json(deletedBudget);

        } catch (err) {
            console.error('Error delete transaction:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    async getCalendar(req, res) {
        try {
            const { startDay, endDay } = req.params;
            const today = moment().startOf('day');

            const budgets = await Budget.find({
                userId: req.userId
            });
            const transactions = await Transaction.find({
                userId: req.userId,
                day: { $gte: startDay, $lte: endDay }
            },);


            const newBudgets = [];
            budgets.forEach(budget => {

                const { frequency } = budget;

                if (repeatOptions.includes(frequency)) {
                    const budgetStart = moment(budget.dayStart);


                    switch (frequency) {
                        case 'Daily':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'day');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'day');
                                }
                            }
                            break;
                        case 'Weekly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'week');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'week');
                                }
                            }
                            break;
                        case 'Biweekly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(2, 'week');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(2, 'week');
                                }
                            }
                            break;
                        case 'Triweekly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(3, 'week');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(3, 'week');
                                }
                            }
                            break;
                        case 'Quadweekly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(4, 'week');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(4, 'week');
                                }
                            }
                            break;

                        case 'Monthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'month');
                                }
                            }
                            break;
                        case 'Bimonthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(2, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(2, 'month');
                                }
                            }
                            break;
                        case 'Trimonthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(3, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(3, 'month');
                                }
                            }
                            break;
                        case 'Quadmonthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(4, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(4, 'month');
                                }
                            }
                            break;
                        case 'Quinmonthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(5, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(5, 'month');
                                }
                            }
                            break;
                        case 'Semiannually':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(6, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(6, 'month');
                                }
                            }
                            break;
                        case 'Annually':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'year');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'year');
                                }
                            }
                            break;

                        default:
                            break;
                    }
                }

            });

            const filteredRecords = newBudgets.filter(budget => {
                return budget.dayStart >= startDay && budget.dayStart <= endDay;
            });

            filteredRecords.forEach(budget => {
                delete budget.deleted;
                delete budget.createdAt;
                delete budget.updatedAt;
                if (budget.hasOwnProperty("dayStart")) {
                    budget.day = budget.dayStart;
                    delete budget.dayStart;

                }
            });

            const merge = [...filteredRecords, ...transactions];
            const group = new Map();

            merge.forEach(obj => {
                const day = moment(obj.day).format('YYYY-MM-DD');
                if (!group.has(day)) {
                    group.set(day, [{ dayExpense: 0, dayRevenue: 0, monthExpense: 0, monthRevenue: 0, total: 0 }]);

                }
                group.get(day).push(obj);

            });

            const groupDay = Array.from(group.values());

            let dayExpense = 0;
            let dayRevenue = 0;
            let monthExpense = 0;
            let monthRevenue = 0;

            groupDay.forEach(arr => {
                arr.forEach(item => {
                    if (item.type == 0) {
                        dayExpense += item.price;
                    } else if (item.type == 1) {
                        dayRevenue += item.price;
                    }
                });
                arr[0].dayExpense = dayExpense;
                arr[0].dayRevenue = dayRevenue;

                dayExpense = 0;
                dayRevenue = 0;


            });

            groupDay.forEach(arr => {
                arr.forEach(item => {
                    monthExpense += item.dayExpense || 0;
                    monthRevenue += item.dayRevenue || 0;
                });
            });

            console.log(monthExpense, monthRevenue);

            groupDay.forEach(arr => {
                arr[0].monthExpense = monthExpense
                arr[0].monthRevenue = monthRevenue
                arr[0].total = monthRevenue - monthExpense
            })


            res.json(groupDay);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }


    async getReport(req, res) {
        try {
            const { startDay, endDay, type } = req.params;
            const today = moment().startOf('day');

            const budgets = await Budget.find({
                userId: req.userId,

            });
            const transactions = await Transaction.find({
                userId: req.userId,
                day: { $gte: startDay, $lte: endDay },
                type: type,
            },);


            const newBudgets = [];
            budgets.forEach(budget => {

                const { frequency } = budget;

                if (repeatOptions.includes(frequency)) {
                    const budgetStart = moment(budget.dayStart);


                    switch (frequency) {
                        case 'Daily':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'day');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'day');
                                }
                            }
                            break;
                        case 'Weekly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'week');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'week');
                                }
                            }
                            break;
                        case 'Biweekly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(2, 'week');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(2, 'week');
                                }
                            }
                            break;
                        case 'Triweekly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(3, 'week');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(3, 'week');
                                }
                            }
                            break;
                        case 'Quadweekly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(4, 'week');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(4, 'week');
                                }
                            }
                            break;

                        case 'Monthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'month');
                                }
                            }
                            break;
                        case 'Bimonthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(2, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(2, 'month');
                                }
                            }
                            break;
                        case 'Trimonthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(3, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(3, 'month');
                                }
                            }
                            break;
                        case 'Quadmonthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(4, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(4, 'month');
                                }
                            }
                            break;
                        case 'Quinmonthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(5, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(5, 'month');
                                }
                            }
                            break;
                        case 'Semiannually':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(6, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(6, 'month');
                                }
                            }
                            break;
                        case 'Annually':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'year');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'year');
                                }
                            }
                            break;

                        default:
                            break;
                    }
                }

            });

            // Lấy budget của tháng 
            const filteredRecords = newBudgets.filter(budget => {
                return budget.dayStart >= startDay && budget.dayStart <= endDay;
            });

            filteredRecords.forEach(budget => {
                delete budget.deleted;
                delete budget.createdAt;
                delete budget.updatedAt;
                if (budget.hasOwnProperty("dayStart")) {
                    budget.day = budget.dayStart;
                    delete budget.dayStart;

                }
            });

            // Cùng ngày
            const merge = [...filteredRecords, ...transactions];
            const group = new Map();

            merge.forEach(obj => {
                const day = moment(obj.day).format('YYYY-MM-DD');
                if (!group.has(day)) {
                    group.set(day, [{ dayExpense: 0, dayRevenue: 0, monthExpense: 0, monthRevenue: 0, total: 0 }]);

                }
                group.get(day).push(obj);

            });

            const groupDay = Array.from(group.values());
            // ----------------------------------------------------------------


            // Lấy tổng ngày tổng tháng
            let dayExpense = 0;
            let dayRevenue = 0;
            let monthExpense = 0;
            let monthRevenue = 0;

            // Ngày
            groupDay.forEach(arr => {
                arr.forEach(item => {
                    if (item.type == 0) {
                        dayExpense += item.price;
                    } else if (item.type === 1) {
                        dayRevenue += item.price;
                    }
                });
                arr[0].dayExpense = dayExpense;
                arr[0].dayRevenue = dayRevenue;

                dayExpense = 0;
                dayRevenue = 0;
            });
            // Tháng
            groupDay.forEach(arr => {
                arr.forEach(item => {
                    monthExpense += item.dayExpense || 0;
                    monthRevenue += item.dayRevenue || 0;
                });
            });
            // Số Dư tháng
            groupDay.forEach(arr => {
                arr[0].monthExpense = monthExpense
                arr[0].monthRevenue = monthRevenue
                arr[0].total = monthRevenue - monthExpense
            })


            // Response phần mobile
            const result = {
                expense: monthExpense,
                revenue: monthRevenue,
                total: monthRevenue - monthExpense,
                category: []
            };

            const categoryTotals = {};

            console.log(type);
            const dataWithTypeZero = groupDay.map(group => group.filter(entry => entry.type === parseInt(type)));

            dataWithTypeZero.forEach(function (arr) {
                arr.forEach(item => {

                    const { category, price } = item;
                    if (category && category._id) {

                        const { _id, name, type, icon, color } = category;

                        if (categoryTotals[_id]) {
                            categoryTotals[_id].total += price;

                        } else {
                            categoryTotals[_id] = {
                                _id,
                                name,
                                type,
                                icon,
                                color,
                                total: price,
                            };
                        }
                    }
                });
            });

            Object.values(categoryTotals).forEach(categoryTotal => {
                result.category.push(categoryTotal);
            });

            result.category.forEach(item => {
                if (item.type === 0) {
                    item.percent = (item.total / result.expense) * 100;
                } else if (item.type === 1) {
                    item.percent = (item.total / result.revenue) * 100;
                }
            });


            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async searchAll(req, res) {
        try {
            const { key } = req.body;
            const today = moment().startOf('day');

            const budgets = await Budget.find({
                userId: req.userId,

            });
            const transactions = await Transaction.find({
                userId: req.userId,
            },);


            const newBudgets = [];
            budgets.forEach(budget => {

                const { frequency } = budget;

                if (repeatOptions.includes(frequency)) {
                    const budgetStart = moment(budget.dayStart);


                    switch (frequency) {
                        case 'Daily':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'day');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'day');
                                }
                            }
                            break;
                        case 'Weekly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'week');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'week');
                                }
                            }
                            break;
                        case 'Biweekly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(2, 'week');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(2, 'week');
                                }
                            }
                            break;
                        case 'Triweekly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(3, 'week');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(3, 'week');
                                }
                            }
                            break;
                        case 'Quadweekly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(4, 'week');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(4, 'week');
                                }
                            }
                            break;

                        case 'Monthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'month');
                                }
                            }
                            break;
                        case 'Bimonthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(2, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(2, 'month');
                                }
                            }
                            break;
                        case 'Trimonthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(3, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(3, 'month');
                                }
                            }
                            break;
                        case 'Quadmonthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(4, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(4, 'month');
                                }
                            }
                            break;
                        case 'Quinmonthly':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(5, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(5, 'month');
                                }
                            }
                            break;
                        case 'Semiannually':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(6, 'month');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(6, 'month');
                                }
                            }
                            break;
                        case 'Annually':

                            if (budget.dayEnd == null) {
                                while (budgetStart.isSameOrBefore(today)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'year');
                                }
                            } else {
                                while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                                    const newBudget = { ...budget.toObject() };
                                    newBudget.dayStart = budgetStart.valueOf();

                                    newBudgets.push(newBudget);
                                    budgetStart.add(1, 'year');
                                }
                            }
                            break;

                        default:
                            break;
                    }
                }

            });


            newBudgets.forEach(budget => {
                delete budget.deleted;
                delete budget.createdAt;
                delete budget.updatedAt;
                if (budget.hasOwnProperty("dayStart")) {
                    budget.day = budget.dayStart;
                    delete budget.dayStart;

                }
            });

            // Cùng ngày
            const merge = [...newBudgets, ...transactions];


            //  Tìm kiếm 

            const filteredData = merge.filter(record => {
                return (
                    record.category.name.includes(key) || // Lọc bằng tên category
                    record.note.includes(key) // Lọc bằng nội dung note
                );
            });

            const group = new Map();

            filteredData.forEach(obj => {
                const day = moment(obj.day).format('YYYY-MM-DD');
                if (!group.has(day)) {
                    group.set(day, [{ dayExpense: 0, dayRevenue: 0, monthExpense: 0, monthRevenue: 0, total: 0 }]);

                }
                group.get(day).push(obj);

            });

            const groupDay = Array.from(group.values());
            // ----------------------------------------------------------------




            // Lấy tổng ngày tổng tháng
            let dayExpense = 0;
            let dayRevenue = 0;
            let monthExpense = 0;
            let monthRevenue = 0;

            // Ngày
            groupDay.forEach(arr => {
                arr.forEach(item => {
                    if (item.type == 0) {
                        dayExpense += item.price;
                    } else if (item.type === 1) {
                        dayRevenue += item.price;
                    }
                });
                arr[0].dayExpense = dayExpense;
                arr[0].dayRevenue = dayRevenue;

                dayExpense = 0;
                dayRevenue = 0;
            });
            // Tháng
            groupDay.forEach(arr => {
                arr.forEach(item => {
                    monthExpense += item.dayExpense || 0;
                    monthRevenue += item.dayRevenue || 0;
                });
            });
            // Số Dư tháng
            groupDay.forEach(arr => {
                arr[0].monthExpense = monthExpense
                arr[0].monthRevenue = monthRevenue
                arr[0].total = monthRevenue - monthExpense
            })


           


            res.json(groupDay);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}

module.exports = new BudgetController();

