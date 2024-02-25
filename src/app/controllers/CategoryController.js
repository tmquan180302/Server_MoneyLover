const Category = require('../models/Category');

class CategoryController {

   
     //[GET] category/getAll
     async showAll(req, res, next) {

        try {
            await Category.find({user: req.user._id})
                .then((result) => {
                    res.json(result);
                });
        } catch (err) {
            console.error('Error fetching category:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }


    //[GET] category/:id
    async show(req, res, next) {

        try {
            await Category.findById(req.params.id)
                .then((result) => {
                    res.json(result);
                });
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
            await Category.findByIdAndUpdate(id, data, { new: true })
                .then((result) => res.status(200).json(result));

        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    }

    //[DELETE] category/delete

    async destroy(req, res, next) {

        try {
            const { id } = req.params;
            await Category.findByIdAndDelete({ _id: id }, { new: true })
                .then((result) => {
                    res.json(result);
                });

        } catch (err) {
            console.error('Error delete category:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

module.exports = new CategoryController();

