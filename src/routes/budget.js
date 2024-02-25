const express = require('express');
const router = express.Router();

const budgetController = require('../app/controllers/BudgetController');
const { authenToken } = require('../middlewares/auth');

router.get('/getAll', authenToken, budgetController.showAll);
router.get('/:id', budgetController.show);
router.get('/create', authenToken, budgetController.create);
router.get('/update', budgetController.update);
router.get('/delete', budgetController.destroy);

module.exports = router;