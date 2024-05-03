const express = require('express');
const router = express.Router();

const billController = require('../../app/controllers/web/BillController');
const { checkAdmin } = require('../../middlewares/auth');

router.use(checkAdmin);

router.get('/', billController.show);

router.get('/dashboard', billController.showDash);

router.get('/:id', billController.showDetail);




module.exports = router;