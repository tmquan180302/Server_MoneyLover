const express = require('express');
const router = express.Router();

const transactionController = require('../app/controllers/TransactionController');
const { authenToken } = require('../middlewares/auth');

router.get('/',authenToken, transactionController.showAll);

router.get('/:id', transactionController.show);
router.post('/create', authenToken, transactionController.create);
router.post('/update', transactionController.update);
router.delete('/delete', transactionController.destroy);

// Get Screens




module.exports = router;