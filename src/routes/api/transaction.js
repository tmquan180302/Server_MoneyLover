const express = require('express');
const router = express.Router();

const transactionController = require('../../app/controllers/api/TransactionController');
const { authenToken } = require('../../middlewares/auth');

router.get('/',authenToken, transactionController.showAll);
router.get('/:id',authenToken, transactionController.show);
router.post('/create', authenToken, transactionController.create);
router.post('/:id/update',authenToken, transactionController.update);
router.delete(':id',authenToken, transactionController.destroy);

// Get Screens




module.exports = router;