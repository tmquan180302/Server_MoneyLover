const Service = require('../../models/Service');

class ServiceController {

    async show(req, res, next) {
        try {
            const service = await Service.find();
            res.status(200).json(service);
        } catch (err) {
            console.error('Error fetching service:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    async create(req, res, next) {
        try {
            const { price, time, description } = req.body;
            const service = new Service({ price: price, time: time, description: description });
            await service.save();
            res.status(201).json('Thêm thành công');
        } catch (err) {
            console.error('Error fetching service:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }
}

module.exports = new ServiceController();