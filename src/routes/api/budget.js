const express = require('express');
const router = express.Router();

const budgetController = require('../../app/controllers/api/BudgetController');
const { authenToken } = require('../../middlewares/auth');



router.get('/allTimeReport', authenToken, budgetController.getAllTimeReport);

router.get('/:startDay/:endDay/:id/report', authenToken, budgetController.getCateroryReport);

router.get('/:type', authenToken, budgetController.getAllReport);

router.get('/:startDay/:endDay/:type/year', authenToken, budgetController.getYearReport);

router.get('/:startDay/:endDay/:type', authenToken, budgetController.getReport);

router.get('/:startDay/:endDay', authenToken, budgetController.getCalendar);


router.delete('/:id', authenToken, budgetController.destroy);
router.post('/find', authenToken, budgetController.searchAll);
router.post('/:id/update', authenToken, budgetController.update);
router.post('/create', authenToken, budgetController.create);
router.get('/', authenToken, budgetController.showAll);



module.exports = router;