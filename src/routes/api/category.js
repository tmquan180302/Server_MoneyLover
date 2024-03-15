const express = require('express');
const router = express.Router();

const categoryController = require('../../app/controllers/api/CategoryController');
const { authenToken } = require('../../middlewares/auth');


router.get('/', authenToken, categoryController.showAll);
router.get('/expense', authenToken, categoryController.showExpense);
router.get('/revenue', authenToken, categoryController.showRevenue);


router.get('/:id',authenToken, categoryController.show);
router.post('/create', authenToken, categoryController.create);
router.post('/:id/update',authenToken, categoryController.update);
router.delete('/:id',authenToken, categoryController.destroy);



module.exports = router;