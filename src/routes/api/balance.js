const express = require('express');
const router = express.Router();

const balanceController = require('../../app/controllers/api/BalanceController');
const { authenToken } = require('../../middlewares/auth');

router.post('/', authenToken, balanceController.show);
router.post('/create', authenToken, balanceController.create);



module.exports = router;