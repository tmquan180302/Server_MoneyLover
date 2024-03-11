const express = require('express');
const router = express.Router();

const budgetController = require('../app/controllers/BudgetController');
const { authenToken } = require('../middlewares/auth');

router.get('/', authenToken, budgetController.showAll);
router.get('/:id', authenToken, budgetController.show);
router.post('/create', authenToken, budgetController.create);
router.post('/update', authenToken, budgetController.update);
router.delete('/:id', authenToken, budgetController.destroy);


//Lấy dữ liệu màn Calendar
router.get('/:startDay/:endDay', authenToken, budgetController.getCalendar);

//Lấy dữ liệu màn Report
router.get('/:startDay/:endDay/:type',authenToken, budgetController.getReport);



module.exports = router;