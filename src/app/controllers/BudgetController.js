const Budget = require('../models/Budget');

class BudgetController {


    //[GET] budget/getAll
    async showAll(req, res, next) {

        try {
            await Budget.find({user: req.user._id})
                .then((result) => {
                    res.json(result);
                });
        } catch (err) {
            console.error('Error fetching budget:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    // [GET] budget/:id
    async show(req, res, next) {

        try {
            await Budget.findById(req.params.id)
                .then((result) => {
                    res.json(result);
                });
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
        const { category, type, dayStart, dayEnd, note, price, frequency  } = req.body;
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
            await Budget.findByIdAndUpdate(id, data, { new: true })
                .then((result) => res.status(200).json(result))
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    }

    //[DELETE] transaction/delete

    async destroy(req, res, next) {

        try {
            const { id } = req.params;
            await Budget.findByIdAndDelete({ _id: id }, { new: true })
                .then((result) => {
                    res.json(result);
                });

        } catch (err) {
            console.error('Error delete transaction:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new BudgetController();
