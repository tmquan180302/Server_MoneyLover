const express = require('express');
const router = express.Router();

const billController = require('../../app/controllers/api/BillController');
const { authenToken } = require('../../middlewares/auth');




module.exports = router;