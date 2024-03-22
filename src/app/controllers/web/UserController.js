const User = require('../../models/User');

class UserController {

    test(req, res, next) {
        try {
            const months = [
                'Tháng 10 năm 2023',
                'Tháng 11 năm 2023',
                'Tháng 12 năm 2023',
                'Tháng 1 năm 2024',
                'Tháng 2 năm 2024',
                'Tháng 3 năm 2024'
            ];
            const totalBills = [45980000, 65828119.99999999, 61920000, 16785920, 0, 0];
            const totalBillsProduct = [-26500000, -63998000, -55920000, -18520000, 0, 0];
            const totalInterests = [19480000, 1830119.9999999925, 6000000, -1734080, 0, 0];
            res.render('dashboard/dashboard', {
                months: JSON.stringify(months),
                totalBills: JSON.stringify(totalBills),
                totalBillsProduct: JSON.stringify(totalBillsProduct),
                totalInterests: JSON.stringify(totalInterests),

            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

module.exports = new UserController();