const Service = require('../../models/Service');
const { exists } = require('../../models/User');

class ServiceController {

    async show(req, res, next) {
        try {
            const array = await Service.find();

            res.render("service/viewService", {
                layout: "layouts/main",
                data: array,
                title: "Gói Premium",
            });
        } catch (error) {
            res.json(error);
        }

    }

    async getPageCreate(req, res, next) {
        try {
            const array = await Service.find();

            res.render("service/formService", {
                layout: "layouts/main",
                data: array,
                title: "Gói Premium",
            });
        } catch (error) {
            res.json(error);
        }

    }

    async create(req, res, next) {
        try {
            const { name, price, time, description } = req.body;
            const service = new Service({ name: name, price: price, time: time, description: description });
            await service.save();
            res.redirect('/service');
        } catch (err) {
            console.error('Error fetching service:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }
    async showDetail(req, res, next) {
        try {
            const array = await Service.findOne({ _id: req.params.id });

            res.render("service/detailService", {
                layout: "layouts/main",
                data: array,
                title: "Gói Premium",
            });
        } catch (error) {
            res.json(error);
        }

    }


    async getPageEdit(req, res, next) {
        try {
            const array = await Service.findOne({ _id: req.params.id });

            res.render("service/editService", {
                layout: "layouts/main",
                data: array,
                title: "Gói Premium",
            });
        } catch (error) {
            res.json(error);
        }

    }

    async edit(req, res, next) {
        try {
            const { name, price, time, description } = req.body;
            await Service.findOneAndUpdate({ _id: req.params.id }, { name: name, price: price, time: time, description: description });
            res.redirect('/service');
        } catch (err) {
            console.error('Error fetching service:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }
    async delete(req, res, next) {
        try {
            await Service.deleteOne({ _id: req.params.id });
            res.redirect('/service');
        } catch (err) {
            console.error('Error fetching service:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }
}

module.exports = new ServiceController();