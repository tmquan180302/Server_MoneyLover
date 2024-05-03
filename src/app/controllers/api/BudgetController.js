const { repeatOptions } = require('../../../utils/options');
const Budget = require('../../models/Budget');
const moment = require('moment-timezone');
const path = require('path');
const Transaction = require('../../models/Transaction');
const Balance = require('../../models/Balance');
const { createObjectCsvWriter } = require('csv-writer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const generateNewBudgets = require('../../../service/budget');

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
            const budget = await Budget.findOne({ _id: req.params.id });
            console.log(req.params.id);
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
            userId: req.userId,
            category: category,
            type: type,
            dayStart: dayStart,
            dayEnd: (dayEnd !== 0) ? dayEnd : null,
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
            dayEnd: (dayEnd !== 0) ? dayEnd : null,
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


            const newBudgets = generateNewBudgets(budgets);

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

            const newBudgets = generateNewBudgets(budgets);

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
                userId: req.userId

            });

            const transactions = await Transaction.find({
                userId: req.userId,
                day: { $gte: startDay, $lte: endDay },
            },);

            // Tạo budget con 
            const newBudgets = generateNewBudgets(budgets);

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
                    revenue: sum1,
                    expense: sum,
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

            const newBudgets = generateNewBudgets(budgets);

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

            const budgets = await Budget.find({
                userId: req.userId
            });
            const transactions = await Transaction.find({
                userId: req.userId,
            },);
            
            console.log(key);

            const newBudgets = generateNewBudgets(budgets);

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

            const newBudgets = generateNewBudgets(budgets);

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


            // Tạo transaction con 
            const newBudgets = generateNewBudgets(budgets);

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
            totals["total"] = totals["revenue"] ? totals["revenue"] : 0 - totals["expense"] ? totals["expense"] : 0 ;
            totals["balance"] = balance ? balance.price : 0;
            totals["cumulation"] = totals["total"] + totals["balance"];

            res.json(totals);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async exportData(req, res) {
        try {

            const today = moment().startOf('day');
            const budgets = await Budget.find({
                userId: req.userId,

            });

            const transactions = await Transaction.find({
                userId: req.userId,
            }).lean();;

            // Tạo budget con 
            const newBudgets = generateNewBudgets(budgets);

            newBudgets.forEach(budget => {
                delete budget.deleted;
                if (budget.hasOwnProperty("dayStart")) {
                    budget.day = budget.dayStart;
                    delete budget.dayStart;
                }
            });


            const merge = [...newBudgets, ...transactions];

            const modifiedData = merge.map(item => ({
                ...item,
                category: item.category.name
            }));
            const csvWriter = createObjectCsvWriter({
                path: path.join(__dirname, '../../../public/file', req.userId + '.csv'), // Đường dẫn đến thư mục upload/output.csv
                header: [
                    { id: 'category', title: 'Danh mục' },
                    { id: 'note', title: 'Ghi chú' },
                    { id: 'price', title: 'Giá' },
                    { id: 'day', title: 'Ngày giao dịch' },
                    { id: 'createdAt', title: 'Ngày tạo' },
                    { id: 'updatedAt', title: 'Ngày sửa' },

                ]
            });
            csvWriter.writeRecords(modifiedData);
            res.status(200).json({ link: 'file/' + req.userId + '.csv' });




        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async exportDataPdf(req, res) {
        try {

            const today = moment().startOf('day');
            const budgets = await Budget.find({
                userId: req.userId,

            });

            const transactions = await Transaction.find({
                userId: req.userId,
            }).lean();;

            // Tạo budget con 
            const newBudgets = generateNewBudgets(budgets);


            newBudgets.forEach(budget => {
                delete budget.deleted;
                if (budget.hasOwnProperty("dayStart")) {
                    budget.day = budget.dayStart;
                    delete budget.dayStart;
                }
            });


            const merge = [...newBudgets, ...transactions];

            const modifiedData = merge.map(item => ({
                ...item,
                category: item.category.name
            }));

            function convertMillisecondsToNormalDate(milliseconds) {
                const date = new Date(milliseconds);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                return `${year}-${month}-${day}`;
            }
            modifiedData.forEach(item => {
                // Chuyển đổi giá thành chuỗi
                item.price = item.price.toString();
                item.day = convertMillisecondsToNormalDate(item.day);
                item.createdAt = convertMillisecondsToNormalDate(item.createdAt);
                item.updatedAt = convertMillisecondsToNormalDate(item.updatedAt);

            });


            // Tạo một tài liệu PDF mới
            const doc = new PDFDocument();
            // Pipe PDF vào một file stream
            const stream = fs.createWriteStream('./src/public/file/' + req.userId + '.pdf');
            doc.pipe(stream);

            // Tạo bảng
            const table = {
                headers: ['Category', 'Note', 'Price', 'Day', 'CreatedAt', 'UpdatedAt',],
                rows: []
            };

            // Thêm dữ liệu từ mảng students vào bảng
            modifiedData.forEach(item => {
                table.rows.push([item.category, item.note, item.price, item.day, item.createdAt, item.updatedAt]);
            });

            // Vẽ bảng
            drawTable(doc, {
                x: 50,
                y: 50,
                table: table
            });

            // Kết thúc và đóng tài liệu PDF
            doc.end();
            res.status(200).json({ link: 'file/' + req.userId + '.pdf' })


            // Hàm để vẽ bảng trong PDF
            function drawTable(doc, options) {
                const startX = options.x;
                const startY = options.y;

                const table = options.table;
                const cellMargin = 10;

                const usableWidth = options.width || 500;

                const columnCount = table.headers.length;
                const rowCount = table.rows.length;

                const columnWidth = usableWidth / columnCount;

                // Vẽ tiêu đề
                doc.font('Helvetica-Bold');
                table.headers.forEach((header, i) => {
                    doc.text(header, startX + i * columnWidth, startY);
                });

                // Vẽ dòng ngăn cách giữa tiêu đề và nội dung
                doc.moveTo(startX, startY + 15)
                    .lineTo(startX + usableWidth, startY + 15)
                    .stroke();

                // Vẽ nội dung của bảng
                table.rows.forEach((row, rowIndex) => {
                    row.forEach((cell, cellIndex) => {
                        doc.font('Helvetica')
                            .text(cell, startX + cellIndex * columnWidth, startY + 20 + (rowIndex + 1) * 30);
                    });
                });

                // Vẽ dòng ngăn cách giữa các dòng dữ liệu
                table.rows.forEach((row, rowIndex) => {
                    doc.moveTo(startX, startY + 35 + (rowIndex + 1) * 30)
                        .lineTo(startX + usableWidth, startY + 35 + (rowIndex + 1) * 30)
                        .stroke();
                });
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new BudgetController();

