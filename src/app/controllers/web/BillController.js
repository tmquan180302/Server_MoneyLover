const Bill = require('../../models/Bill');
const User = require('../../models/User');
const moment = require('moment-timezone');

class BillController {

    async showDash(req, res, next) {
        try {

            const bills = await Bill.find();
            const users = await User.find();

            // format
            const formattedDates = bills.map(item => {
                const date = new Date(item.dayStart);
                const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                return formattedDate;
            });
            const formattedDatesUser = users.map(item => {
                const date = new Date(item.createdAt);
                const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                return formattedDate;
            });

            function extractMonths(data) {
                const monthsSet = new Set();

                for (const dateString of data) {
                    const [month, year] = dateString.split('/').map(Number);

                    for (let i = 1; i <= 12; i++) {
                        if (year === new Date().getFullYear() && i < month) continue;
                        monthsSet.add(`${i.toString().padStart(2, '0')}/${year}`);
                    }
                }
                return Array.from(monthsSet);
            }


            // column chart
            const months = extractMonths(formattedDates);


            const monthlyPrice = {};

            for (const item of bills) {

                const date = new Date(item.dayStart);
                const monthYear = `0${date.getMonth() + 1}/${date.getFullYear()}`;

                if (monthlyPrice[monthYear]) {
                    monthlyPrice[monthYear] += parseInt(item.service.price);
                } else {
                    monthlyPrice[monthYear] = parseInt(item.service.price);
                }
            }

            const totalBills = months.map(month => {
                return monthlyPrice[month] || 0;
            });

            // pie chart
            const userTotal = users.length;
            const userPremium = bills.length;
            const userNotPremium = userTotal - userPremium;
            const pie = [];
            pie.push(userPremium);
            pie.push(userNotPremium);

            // line chart
            const monthlineChart = extractMonths(formattedDatesUser);

            const dateObjects = monthlineChart.map(dateString => {
                const [month, year] = dateString.split('/');
                return new Date(year, month - 1);
            });

            dateObjects.sort((a, b) => a - b);

            const sortedDates = dateObjects.map(date => {
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear().toString();
                return `${month}/${year}`;
            });

            const monthlyUser = {};

            users.forEach(item => {

                const date = new Date(item.createdAt);
                const monthYear = `0${date.getMonth() + 1}/${date.getFullYear()}`;

                monthlyUser[monthYear] = (monthlyUser[monthYear] || 0) + 1;
            });
            const userLineChart = [];

            let prevTotal = 0;

            sortedDates.forEach(month => {

                const currentTotal = monthlyUser[month] !== undefined ? prevTotal + monthlyUser[month] : prevTotal;

                const total = currentTotal;

                userLineChart.push(total);

                prevTotal = total;
            });

            res.render('dashboard/dashboard', {
                layout: 'layouts/main',
                title: 'Thống kê',
                months: JSON.stringify(months),
                totalBills: JSON.stringify(totalBills),
                pie: JSON.stringify(pie),
                userTotal: JSON.stringify(userTotal),
                userPremium: JSON.stringify(userPremium),
                userNotPremium: JSON.stringify(userNotPremium),
                monthLineChart: JSON.stringify(sortedDates),
                userLineChart: JSON.stringify(userLineChart),



            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    async show(req, res, next) {
        try {
            const today = new Date().getTime()
            const array = await Bill.find()
                .populate('userId').lean();

            array.forEach(document => {
                const expirationDate = document.dayStart + document.service.time;
                document.status = expirationDate < today;
            });
            res.render("bill/viewBill", {
                layout: "layouts/main",
                data: array,
                title: "Hóa đơn",
            });
        } catch (error) {
            res.json(error);
        }
    }

    async showDetail(req, res, next) {
        try {
            const array = await Bill.findOne({_id : req.params.id})
                .populate('userId');
            res.render("bill/detailBill", {
                layout: "layouts/main",
                data: array,
                title: "Chi tiết hóa đơn",
            });
        } catch (error) {
            res.json(error);
        }
    }

}

module.exports = new BillController();