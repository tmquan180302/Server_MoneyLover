const express = require('express');
const router = express.Router();

const serviceController = require('../../app/controllers/api/ServiceController');
const { authenToken } = require('../../middlewares/auth');


router.get('/getList', authenToken, serviceController.show);


module.exports = router;