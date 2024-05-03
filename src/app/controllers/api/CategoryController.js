const Category = require('../../models/Category');
const Transaction = require('../../models/Transaction');
const Budget = require('../../models/Budget');

class CategoryController {


    //[GET] category/getAll
    async showAll(req, res, next) {

        try {
            const data = await Category.find({ userId: req.userId })
            res.json(data);
        } catch (err) {
            console.error('Error fetching category:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    /// GET /category/expense
    async showExpense(req, res, next) {

        try {
            const data = await Category.find({ userId: req.userId, type: 0 });
            res.json(data);
        } catch (err) {
            console.error('Error fetching category:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }


    /// GET /category/revenue
    async showRevenue(req, res, next) {

        try {
            const data = await Category.find({ userId: req.userId, type: 1 })
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
            userId: req.userId,
            type: type,
            name: name,
            icon: icon,
            color: color
        });

        try {
            await category.save();
            res.status(201).json("Thêm thành công");
        } catch (error) {
            res.status(400).json(error.message);
        }

    }

    //[POST] category/update
    async update(req, res, next) {
        const id = req.params.id;
        const { type, name, icon, color } = req.body;
        const data = {
            _id: id,
            type: type,
            name: name,
            icon: icon,
            color: color,
            userId: req.userId
        };

        try {
            await Category.updateOne({ _id: id }, data, { new: true });
            await Transaction.updateMany({ "category._id": id }, { category: data });
            await Budget.updateMany({ "category._id": id }, { category: data });

            res.status(200).json("Cập nhật thành công");
        } catch (error) {
            res.status(400).json(error.message);
        }

    }

    //[DELETE] category/delete

    async destroy(req, res, next) {

        try {
            const id = req.params.id;
            console.log(id);
            const deletedCategory = await Category.deleteOne({ _id: id });
            console.log(deletedCategory);
            res.json(deletedCategory.deletedCount == 1);

        } catch (err) {
            console.error('Error delete category:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

module.exports = new CategoryController();

