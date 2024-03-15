const Balance = require('../../models/Balance');


class BalanceController {

    async show(req, res) {
        try {
            const balance = await Balance.find({ userId: req.userId });
            res.status(200).json(balance);
        } catch (err) {
            console.error('Error fetching balance:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };


    async create(req, res) {

        const { price } = req.body;
        
        try {
            const balance = await Balance.findOne({ userId: req.userId });

            if (balance != null) {
                await Balance.updateOne({ userId: req.userId }, { price: price }, { new: true });
                res.status(200).json('Cập nhật thành công');
            } else {
                await Balance.create({ userId: req.userId, price: price });
                res.status(200).json('Tạo số dư kì đầu thành công');
            }
        } catch (err) {
            console.error('Error fetching balance:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

};

module.exports = new BalanceController();

