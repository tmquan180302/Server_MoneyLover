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

            merge.sort((a, b) => a.day - b.day);

            const groupedByDay = {};

            merge.forEach(record => {
                const day = moment(record.day).format('DD-MM-YYYY');

                if (groupedByDay.hasOwnProperty(day)) {
                    groupedByDay[day].push(record);
                } else {
                    groupedByDay[day] = [record];
                }
            });



            Object.keys(groupedByDay).forEach(day => {

                const totalPriceByType = {};

                groupedByDay[day].forEach(record => {
                    const categoryType = record.category.type === 0 ? 'expense' : 'revenue';

                    if (totalPriceByType.hasOwnProperty(categoryType)) {

                        totalPriceByType[categoryType] += record.price;
                    } else {

                        totalPriceByType[categoryType] = record.price;
                    }

                });
                groupedByDay[day].push(totalPriceByType);
            });

            let totalExpense = 0;
            let totalRevenue = 0;

            Object.keys(groupedByDay).forEach(day => {

                groupedByDay[day].forEach(record => {

                    if (record.revenue) {
                        totalRevenue += record.revenue;
                    } else if (record.expense) {
                        totalExpense += record.expense;
                    }

                });

            });
            groupedByDay.totalRevenue = totalRevenue;
            groupedByDay.totalExpense = totalExpense;
            groupedByDay.total = totalRevenue - totalExpense;

            res.json(groupedByDay);
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

            merge.sort((a, b) => a.day - b.day);

            const groupedByDay = {};

            merge.forEach(record => {
                const day = moment(record.day).format('DD-MM-YYYY');

                if (groupedByDay.hasOwnProperty(day)) {
                    groupedByDay[day].push(record);
                } else {
                    groupedByDay[day] = [record];
                }
            });



            Object.keys(groupedByDay).forEach(day => {

                const totalPriceByType = {};

                groupedByDay[day].forEach(record => {
                    const categoryType = record.category.type === 0 ? 'expense' : 'revenue';

                    if (totalPriceByType.hasOwnProperty(categoryType)) {

                        totalPriceByType[categoryType] += record.price;
                    } else {

                        totalPriceByType[categoryType] = record.price;
                    }

                });
                groupedByDay[day].push(totalPriceByType);
            });

            let totalExpense = 0;
            let totalRevenue = 0;

            Object.keys(groupedByDay).forEach(day => {

                groupedByDay[day].forEach(record => {

                    if (record.revenue) {
                        totalRevenue += record.revenue;
                    } else if (record.expense) {
                        totalExpense += record.expense;
                    }

                });

            });

            function filterRecords(data) {
                const filteredData = {};
                Object.entries(data).forEach(([date, records]) => {
                    const filteredRecords = records.filter(record => record.category && record.category.type == type);
                    if (filteredRecords.length > 0) {
                        filteredData[date] = filteredRecords;
                    }
                });
                return filteredData;
            }

            const filteredData = filterRecords(groupedByDay);
            const categoryTotals = {};

            Object.values(filteredData).forEach(record => {
                record.forEach(item => {
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
                })

            });

            const result = {
                expense: totalRevenue,
                revenue: totalExpense,
                total: totalRevenue - totalExpense,
                category: []
            };

            Object.values(categoryTotals).forEach(categoryTotal => {
                result.category.push(categoryTotal);
            });

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }



    async getYearReport(req, res) {
        try {
            const { startDay, endDay, type } = req.params;
            const today = moment().startOf('day');

            const budgets = await Budget.find({
                userId: req.userId,

            });

            const transactions = await Transaction.find({
                userId: req.userId,
                day: { $gte: startDay, $lte: endDay },
            },);

            // Tạo budget con 
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
            //------------------------------


            newBudgets.forEach(budget => {
                delete budget.deleted;
                delete budget.createdAt;
                delete budget.updatedAt;
                if (budget.hasOwnProperty("dayStart")) {
                    budget.day = budget.dayStart;
                    delete budget.dayStart;

                }
            });



            if (type == '0' || type == '1') {

                const filterTransaction = transactions.filter(transaction => {
                    return transaction.category.type == type;
                });

                const filter = newBudgets.filter(budget => {
                    return budget.category.type == type;
                });

                // Cùng ngày
                const merge = [...filter, ...filterTransaction];



                const aggregatedRecords = {};

                merge.forEach(record => {
                    const month = moment(record.day).format('MM-YYYY');

                    if (!aggregatedRecords[month]) {
                        aggregatedRecords[month] = 0
                    }

                    aggregatedRecords[month] += record.price;

                });

                const sum = Object.values(aggregatedRecords).reduce((acc, curr) => acc + curr, 0);
                const average = sum / Object.keys(aggregatedRecords).length;

                aggregatedRecords.sum = sum;
                aggregatedRecords.average = average;

                res.json(aggregatedRecords);


            } else if (type == '2') {

                //Chi 
                const filterTransaction = transactions.filter(transaction => {
                    return transaction.category.type == '0';
                });

                const filter = newBudgets.filter(budget => {
                    return budget.category.type == '0';
                });

                // Cùng ngày
                const merge = [...filter, ...filterTransaction];



                const aggregatedRecords = {};

                merge.forEach(record => {
                    const month = moment(record.day).format('MM-YYYY');

                    if (!aggregatedRecords[month]) {
                        aggregatedRecords[month] = 0
                    }

                    aggregatedRecords[month] += record.price;

                });

                const sum = Object.values(aggregatedRecords).reduce((acc, curr) => acc + curr, 0);
                const average = sum / Object.keys(aggregatedRecords).length;

                aggregatedRecords.sum = sum;
                aggregatedRecords.average = average;

                //Thu 
                const filterTransaction1 = transactions.filter(transaction => {
                    return transaction.category.type == '1';
                });

                const filter1 = newBudgets.filter(budget => {
                    return budget.category.type == '1';
                });

                // Cùng ngày
                const merge1 = [...filterTransaction1, ...filter1];



                const aggregatedRecords1 = {};

                merge1.forEach(record => {
                    const month = moment(record.day).format('MM-YYYY');

                    if (!aggregatedRecords1[month]) {
                        aggregatedRecords1[month] = 0
                    }

                    aggregatedRecords1[month] += record.price;

                });

                const sum1 = Object.values(aggregatedRecords1).reduce((acc, curr) => acc + curr, 0);
                const average1 = sum / Object.keys(aggregatedRecords1).length;

                aggregatedRecords1.sum = sum1;
                aggregatedRecords1.average = average1;



                const difference = {};

                const keys = new Set([...Object.keys(aggregatedRecords), ...Object.keys(aggregatedRecords1)]);

                for (const key of keys) {
                    const value1 = aggregatedRecords[key] || 0;
                    const value2 = aggregatedRecords1[key] || 0;
                    difference[key] = value2 - value1;
                }
                res.json(difference);

            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }



    async getAllReport(req, res) {
        try {
            const { type } = req.params;
            const today = moment().startOf('day');

            const budgets = await Budget.find({
                userId: req.userId
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

            const merge = [...newBudgets, ...transactions];

            merge.sort((a, b) => a.day - b.day);

            const groupedByDay = {};

            merge.forEach(record => {
                const day = moment(record.day).format('DD-MM-YYYY');

                if (groupedByDay.hasOwnProperty(day)) {
                    groupedByDay[day].push(record);
                } else {
                    groupedByDay[day] = [record];
                }
            });



            Object.keys(groupedByDay).forEach(day => {

                const totalPriceByType = {};

                groupedByDay[day].forEach(record => {
                    const categoryType = record.category.type === 0 ? 'expense' : 'revenue';

                    if (totalPriceByType.hasOwnProperty(categoryType)) {

                        totalPriceByType[categoryType] += record.price;
                    } else {

                        totalPriceByType[categoryType] = record.price;
                    }

                });
                groupedByDay[day].push(totalPriceByType);
            });

            let totalExpense = 0;
            let totalRevenue = 0;

            Object.keys(groupedByDay).forEach(day => {

                groupedByDay[day].forEach(record => {

                    if (record.revenue) {
                        totalRevenue += record.revenue;
                    } else if (record.expense) {
                        totalExpense += record.expense;
                    }

                });

            });

            function filterRecords(data) {
                const filteredData = {};
                Object.entries(data).forEach(([date, records]) => {
                    const filteredRecords = records.filter(record => record.category && record.category.type == type);
                    if (filteredRecords.length > 0) {
                        filteredData[date] = filteredRecords;
                    }
                });
                return filteredData;
            }

            const filteredData = filterRecords(groupedByDay);
            const categoryTotals = {};

            Object.values(filteredData).forEach(record => {
                record.forEach(item => {
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
                })

            });

            const result = {
                expense: totalExpense,
                revenue: totalRevenue,
                total: totalRevenue - totalExpense,
                category: []
            };

            Object.values(categoryTotals).forEach(categoryTotal => {
                categoryTotal.percent = type == '0' ?
                    (totalExpense !== 0 ? (categoryTotal.total / totalExpense * 100) : 0) :
                    (totalRevenue !== 0 ? (categoryTotal.total / totalRevenue * 100) : 0);
            });


            Object.values(categoryTotals).forEach(categoryTotal => {
                result.category.push(categoryTotal);
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
                userId: req.userId
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

            const merge = [...newBudgets, ...transactions];

            const filteredArray = merge.filter(item => {
                return item.note.includes(key) || item.category.name.includes(key);
            });

            filteredArray.sort((a, b) => a.day - b.day);

            const groupedByDay = {};

            filteredArray.forEach(record => {
                const day = moment(record.day).format('DD-MM-YYYY');

                if (groupedByDay.hasOwnProperty(day)) {
                    groupedByDay[day].push(record);
                } else {
                    groupedByDay[day] = [record];
                }
            });



            Object.keys(groupedByDay).forEach(day => {

                const totalPriceByType = {};

                groupedByDay[day].forEach(record => {
                    const categoryType = record.category.type === 0 ? 'expense' : 'revenue';

                    if (totalPriceByType.hasOwnProperty(categoryType)) {

                        totalPriceByType[categoryType] += record.price;
                    } else {

                        totalPriceByType[categoryType] = record.price;
                    }

                });
                groupedByDay[day].push(totalPriceByType);
            });

            let totalExpense = 0;
            let totalRevenue = 0;

            Object.keys(groupedByDay).forEach(day => {

                groupedByDay[day].forEach(record => {

                    if (record.revenue) {
                        totalRevenue += record.revenue;
                    } else if (record.expense) {
                        totalExpense += record.expense;
                    }

                });

            });
            groupedByDay.totalRevenue = totalRevenue;
            groupedByDay.totalExpense = totalExpense;
            groupedByDay.total = totalRevenue - totalExpense;

            res.json(groupedByDay);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}

module.exports = new BudgetController();

