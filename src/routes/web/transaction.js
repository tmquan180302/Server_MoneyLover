const express = require('express');
const router = express.Router();

const transactionController = require('../../app/controllers/web/TransactionController');
const { checkAdmin } = require('../../middlewares/auth');

router.use(checkAdmin);

router.get('/', transactionController.showList);
router.get('/user/:id', transactionController.showUserTransaction);
router.get('/:id', transactionController.showDetailTransaction);
router.get('/trash/:id', transactionController.showTrash);
router.get('/restore/:id', transactionController.restore);



module.exports = router;