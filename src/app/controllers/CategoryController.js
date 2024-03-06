const Category = require('../models/Category');

class CategoryController {


    //[GET] category/getAll
    async showAll(req, res, next) {

        try {
            const data = await Category.find({ user: req.user._id })
            res.json(data);
        } catch (err) {
            console.error('Error fetching category:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    /// GET /category/expense
    async showExpense(req, res, next) {

        try {
            const data = await Category.find({ user: req.user._id, type: 0 })
            res.json(data);
        } catch (err) {
            console.error('Error fetching category:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }


    /// GET /category/revenue
    async showRevenue(req, res, next) {

        try {
            const data = await Category.find({ user: req.user._id, type: 1 })
            res.json(data);
        } catch (err) {
            console.error('Error fetching category:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }


    //[GET] category/:id
    async show(req, res, next) {

        try {
            const category = await Category.findOne({ _id: req.params.id })
            res.json(category);
        } catch (err) {
            console.error('Error fetching category:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    //[POST] category/create
    async create(req, res, next) {

        const { type, name, icon, color } = req.body;
        const category = new Category({
            user: req.user._id,
            type: type,
            name: name,
            icon: icon,
            color: color
        });

        try {
            const newCategory = await category.save();
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    }

    //[POST] category/update
    async update(req, res, next) {
        const id = req.params.id;
        const { type, name, icon, color } = req.body;
        const data = {
            type: type,
            name: name,
            icon: icon,
            color: color
        };

        try {
            const category = await Category.updateOne({ _id: id }, data, { new: true });
            res.json(category);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    }

    //[DELETE] category/delete

    async destroy(req, res, next) {

        try {
            const id = req.params.id;
            console.log(id);
            const deletedCategory = await Category.delete({_id : id});
            res.json(deletedCategory);

        } catch (err) {
            console.error('Error delete category:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

module.exports = new CategoryController();

