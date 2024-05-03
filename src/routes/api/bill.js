const express = require('express');
const router = express.Router();

const billController = require('../../app/controllers/api/BillController');
const { authenToken } = require('../../middlewares/auth');

router.post('/create', authenToken, billController.create);
router.get('/checkUser',authenToken, billController.check);



module.exports = router;