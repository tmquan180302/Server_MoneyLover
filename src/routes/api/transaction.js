const express = require('express');
const router = express.Router();

const transactionController = require('../../app/controllers/api/TransactionController');
const { authenToken } = require('../../middlewares/auth');

router.get('/:id/restore',authenToken, transactionController.restore);
router.delete('/:id/force', authenToken, transactionController.forceDestroy);
router.get('/getListDeleted', authenToken, transactionController.getListDeleted);

router.delete('/:id', authenToken, transactionController.destroy);
router.post('/:id/update', authenToken, transactionController.update);
router.post('/create', authenToken, transactionController.create);
router.get('/:id', authenToken, transactionController.show);
router.get('/', authenToken, transactionController.showAll);


// Get Screens




module.exports = router;