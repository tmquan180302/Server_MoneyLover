const Transaction = require('../../models/Transaction');

class TransactionController {


    //[GET] transaction/getAll
    async showAll(req, res, next) {

        try {
            const transactions = await Transaction.find({ userId: req.userId });
            console.log("list transaction", transactions);
            res.status(200).json(transactions);
        } catch (err) {
            console.error('Error fetching Transaction:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    // [GET] transaction/:id
    async show(req, res, next) {

        try {
            const transaction = await Transaction.findById(req.params.id)
            res.status(200).json(transaction);
        } catch (err) {
            console.error('Error fetching Transaction:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }


    //[POST] transaction/create
    async create(req, res, next) {

        const { category, type, day, note, price } = req.body;
        const transaction = new Transaction({
            userId: req.userId,
            category: category,
            type: type,
            day: day,
            note: note,
            price: price
        });

        try {
            const rs = await transaction.save();
            console.log(rs)
            res.status(200).json();
        } catch (error) {
            res.status(500).json();
        }

    }

    //[POST] transaction/update/:id
    async update(req, res, next) {
        const id = req.params.id;
        const { category, type, day, note, price } = req.body;
        const data = {
            category: category,
            type: type,
            day: day,
            note: note,
            price: price
        }

        try {
            await Transaction.updateOne({ _id: id }, data, { new: true });
            res.status(200).json('Cập nhật thành công');
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    }

    //[DELETE] transaction/delete

    async destroy(req, res, next) {

        try {
            const id = req.params.id;
            await Transaction.delete({ _id: id }, { new: true });
            res.status(200).json('Xóa thành công');

        } catch (err) {
            console.error('Error delete transaction:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    //[GET] transaction/calendarScreen






}

module.exports = new TransactionController();

