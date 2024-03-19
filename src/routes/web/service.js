const express = require('express');
const router = express.Router();

const serviceController = require('../../app/controllers/web/ServiceController');


router.get('/', serviceController.show);
router.post('/create', serviceController.create);


module.exports = router;