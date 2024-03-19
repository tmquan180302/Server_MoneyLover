const { repeatOptions } = require('../../../util/options');
const Budget = require('../../models/Budget');
const moment = require('moment-timezone');
const Transaction = require('../../models/Transaction');
const Balance = require('../../models/Balance');


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
            await Budget.findOneAndUpdate({ _id: id }, data, { new: true });
            res.status(200).json('Sửa thành công');
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    }


    async destroy(req, res, next) {

        try {
            const id = req.params.id;
            await Budget.delete({ _id: id }, { new: true });
            res.status(200).json('Xóa thành công');

        } catch (err) {
            console.error('Error delete transaction:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // đã sửa
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

            newBudgets.forEach(budget => {
                delete budget.deleted;
                delete budget.createdAt;
                delete budget.updatedAt;
                delete budget.frequency;
                delete budget.dayEnd;
                if (budget.hasOwnProperty("dayStart")) {
                    budget.day = budget.dayStart;
                    delete budget.dayStart;

                }
            });

            const merge = [...newBudgets, ...transactions];

            const filteredArray = merge.filter(item => {
                return item.day >= startDay && item.day <= endDay;
            });

            filteredArray.sort((a, b) => a.day - b.day);


            function calculateTotalPriceByCategoryType(data) {
                const totalPriceByCategoryType = {};

                data.forEach(entry => {
                    const { category, price } = entry;
                    const { type } = category;

                    if (!totalPriceByCategoryType[type]) {
                        totalPriceByCategoryType[type] = 0;
                    }

                    totalPriceByCategoryType[type] += price;
                });

                return totalPriceByCategoryType;
            }



            const caculateType = calculateTotalPriceByCategoryType(filteredArray);


            const groupedByDay = {};

            filteredArray.forEach(record => {
                const day = moment(record.day).format('DD-MM-YYYY');

                if (groupedByDay.hasOwnProperty(day)) {
                    groupedByDay[day].push(record);
                } else {
                    groupedByDay[day] = [record];
                }
            });


            const totalPriceByTypeAndDay = {};

            Object.keys(groupedByDay).forEach(day => {
                const totalPriceByType = {};

                groupedByDay[day].forEach(record => {
                    const categoryType = record.category.type;
                    if (!totalPriceByType[categoryType]) {
                        totalPriceByType[categoryType] = 0;
                    }
                    totalPriceByType[categoryType] += record.price;
                });

                totalPriceByTypeAndDay[day] = totalPriceByType;
            });

            const transformedData = Object.keys(totalPriceByTypeAndDay).map(date => {

                const dayData = totalPriceByTypeAndDay[date];
                const expense = dayData['0'] || 0;
                const revenue = dayData['1'] || 0;
                const [day, month, year] = date.split('-').map(Number);
                return {
                    expense: expense,
                    revenue: revenue,
                    day: day,
                    month: month,
                    year: year
                };
            });

            const result = {
                calendar: transformedData,
                expense: caculateType["0"] !== undefined ? caculateType["0"] : 0,
                revenue: caculateType["1"] !== undefined ? caculateType["1"] : 0,
                total: (caculateType["1"] !== undefined ? caculateType["1"] : 0) - (caculateType["0"] !== undefined ? caculateType["0"] : 0),
                transactions: filteredArray
            };

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }


    // đã sửa
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


            newBudgets.forEach(budget => {
                delete budget.deleted;
                delete budget.createdAt;
                delete budget.updatedAt;
                delete budget.frequency;
                delete budget.dayEnd;
                if (budget.hasOwnProperty("dayStart")) {
                    budget.day = budget.dayStart;
                    delete budget.dayStart;

                }
            });

            const filterDay = newBudgets.filter(item => {
                return item.day >= startDay && item.day <= endDay;
            })

            const merge = [...filterDay, ...transactions];

            // Lấy tổng thu chi tháng
            const expenseTransaction = merge.filter(item => {
                return item.category.type == '0';
            });
            const revenueTransaction = merge.filter(item => {
                return item.category.type == '1';
            });

            let expense = 0;
            let revenue = 0;

            expenseTransaction.forEach(item => {

                if (item.price) {
                    expense += item.price;
                } else if (item.price) {
                    expense += item.price;
                }

            });

            revenueTransaction.forEach(item => {

                if (item.price) {
                    revenue += item.price;
                } else if (item.price) {
                    revenue += item.price;
                }

            });
            ////----------------------------------------------------------------

            // Lọc theoo danh mục truyền qua params
            const filter = merge.filter(item => {
                return item.category.type == type;
            });

            let total = 0;

            filter.forEach(item => {

                if (item.price) {
                    total += item.price;
                } else if (item.price) {
                    total += item.price;
                }

            });


            const categoryTotals = {};

            filter.forEach(item => {
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

            Object.values(categoryTotals).forEach(categoryTotal => {
                categoryTotal.percent = categoryTotal.total / total * 100
            });

            const convertedArray = Object.values(categoryTotals);

            const result = {
                expense: expense,
                revenue: revenue,
                total: revenue - expense,
                category: convertedArray
            }

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // đã sửa
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



                const chart = [];
                for (const key in aggregatedRecords) {
                    const [month, year] = key.split('-');
                    const total = aggregatedRecords[key];

                    chart.push({
                        month: month ? parseInt(month) : "",
                        total: total ? total : "",
                        year: year ? parseInt(year) : ""
                    });
                }
                const result = {
                    sum: sum,
                    average: average,
                    chart: chart,
                }
                res.json(result);


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

                //----------------------------------------------------------------

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



                const difference = {};

                const keys = new Set([...Object.keys(aggregatedRecords), ...Object.keys(aggregatedRecords1)]);

                for (const key of keys) {
                    const value1 = aggregatedRecords[key] || 0;
                    const value2 = aggregatedRecords1[key] || 0;
                    difference[key] = value2 - value1;
                }

                const chart = [];
                for (const key in difference) {
                    const [month, year] = key.split('-');
                    const total = difference[key];

                    chart.push({
                        month: month ? parseInt(month) : "",
                        total: total ? total : "",
                        year: year ? parseInt(year) : ""
                    });
                }
                const result = {
                    sum: sum1 - sum,
                    average: average1 - average,
                    chart: chart,
                }
                res.json(result);

            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }


    // đã sửa
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
                delete budget.frequency;
                delete budget.dayEnd;
                if (budget.hasOwnProperty("dayStart")) {
                    budget.day = budget.dayStart;
                    delete budget.dayStart;

                }
            });

            const merge = [...newBudgets, ...transactions];

            const filter = merge.filter(item => {
                return item.category.type == type;
            });

            let total = 0;

            filter.forEach(item => {

                if (item.price) {
                    total += item.price;
                } else if (item.price) {
                    total += item.price;
                }

            });


            const categoryTotals = {};

            filter.forEach(item => {
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

            Object.values(categoryTotals).forEach(categoryTotal => {
                categoryTotal.percent = categoryTotal.total / total * 100
            });

            const convertedArray = Object.values(categoryTotals);


            res.json(convertedArray);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // đã sửa 
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
                delete budget.frequency;
                delete budget.dayEnd;
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


            function calculateTotalPriceByCategoryType(data) {
                const totalPriceByCategoryType = {};

                data.forEach(entry => {
                    const { category, price } = entry;
                    const { type } = category;

                    if (!totalPriceByCategoryType[type]) {
                        totalPriceByCategoryType[type] = 0;
                    }

                    totalPriceByCategoryType[type] += price;
                });

                return totalPriceByCategoryType;
            }

            const caculateType = calculateTotalPriceByCategoryType(filteredArray);


            const result = {
                "expense": caculateType["0"] !== undefined ? caculateType["0"] : 0,
                "revenue": caculateType["1"] !== undefined ? caculateType["1"] : 0,
                "total": (caculateType["1"] !== undefined ? caculateType["1"] : 0) - (caculateType["0"] !== undefined ? caculateType["0"] : 0),
                "transactions": filteredArray
            };

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // đã sửa 
    async getCateroryReport(req, res) {
        try {
            const { startDay, endDay, id } = req.params;
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
                delete budget.frequency;
                delete budget.dayEnd;
                if (budget.hasOwnProperty("dayStart")) {
                    budget.day = budget.dayStart;
                    delete budget.dayStart;

                }
            });
            // Lọc Bản ghi theo id 
            const filteredBudgets = newBudgets.filter(budget => {
                return budget.category._id == id;
            });

            const filteredTransactions = transactions.filter(transaction => {
                return transaction.category._id == id;
            });
            const merge = [...filteredBudgets, ...filteredTransactions];

            merge.sort((a, b) => a.day - b.day);

            const filterMerge = merge.filter(transaction => {
                return transaction.day >= startDay && transaction.day <= endDay;
            });



            const groupedByMonth = {};
            // Gộp ngày
            merge.forEach(record => {
                const month = moment(record.day).format('MM-YYYY');

                if (groupedByMonth.hasOwnProperty(month)) {
                    groupedByMonth[month].push(record);
                } else {
                    groupedByMonth[month] = [record];
                }
            });


            function calculateTotalPrice(items) {
                return items.reduce((total, item) => total + item.price, 0);
            }

            // tổng giá theo tháng
            function calculateMonthlyTotal(data) {
                const monthlyTotal = {};

                for (const month in data) {
                    const items = data[month];
                    const totalPrice = calculateTotalPrice(items);
                    monthlyTotal[month] = totalPrice;
                }

                return monthlyTotal;
            }

            const result = calculateMonthlyTotal(groupedByMonth);

            const chart = [];
            for (const key in result) {
                const [month, year] = key.split('-');
                const total = result[key];

                chart.push({
                    month: month ? parseInt(month) : "",
                    total: total ? total : "",
                    year: year ? parseInt(year) : ""
                });
            }

            res.json({ chart, transactions: filterMerge });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    //đã sửa
    async getAllTimeReport(req, res) {
        try {


            const today = moment().startOf('day');
            const budgets = await Budget.find({
                userId: req.userId,

            });

            const transactions = await Transaction.find({
                userId: req.userId,
            },);

            const balance = await Balance.findOne({
                userId: req.userId,
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


            const merge = [...newBudgets, ...transactions];


            const totals = {};

            merge.forEach(record => {

                const type = record.category.type === 0 ? 'expense' : 'revenue';

                if (!totals[type]) {

                    totals[type] = 0;
                }
                totals[type] += record.price;
            });
            totals["total"] = totals["revenue"] - totals["expense"];
            totals["balance"] = balance.price;
            totals["cumulation"] = totals["total"] + totals["balance"];

            res.json(totals);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new BudgetController();

