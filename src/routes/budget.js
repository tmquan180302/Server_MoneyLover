const express = require('express');
const router = express.Router();

const budgetController = require('../app/controllers/BudgetController');
const { authenToken } = require('../middlewares/auth');

router.get('/', authenToken, budgetController.showAll);
router.get('/:id', budgetController.show);
router.post('/create', authenToken, budgetController.create);
router.post('/update', budgetController.update);
router.delete('/:id', budgetController.destroy);

module.exports = router;