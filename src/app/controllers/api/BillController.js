const Bill = require('../../models/Bill');
const moment = require('moment-timezone');


class BillController {

    async create(req, res, next) {
        try {

            const { service, dayStart } = req.body;

            // Cần check đã đăng ký chưa , và bill còn hiệu lực hay không?
            const data = new Bill({ userId: req.userId, service: service, dayStart: dayStart });

            await data.save();

            res.json('Thêm hóa đơn thành công');

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async check(req, res) {
        try {
            const today = moment().startOf('day');

            const check = await Bill.find({ userId: req.userId });
            const filtered = check.filter(item => {
                return (item.dayStart + item.service.time) >= today
            });
            if (filtered.length > 0) {
                res.status(200).json('Tài khoản premium');
            } else {
                res.status(404).json('Tài khoản chưa có premium');
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    }

}

module.exports = new BillController();