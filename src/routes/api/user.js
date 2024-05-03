const express = require('express');
const router = express.Router();

const userController = require('../../app/controllers/api/UserController');
const budgetController = require('../../app/controllers/api/BudgetController');

const { authenToken } = require('../../middlewares/auth');

router.get('/:id/find', authenToken, budgetController.show);// Tổ chức router sai
router.get('/exportPdf',authenToken, budgetController.exportDataPdf);
router.get('/export', authenToken, budgetController.exportData);

router.post('/login', userController.login);
router.post('/loginGoogle', userController.loginGoogle);
router.post('/register', userController.create);
router.post('/updatePass',authenToken, userController.updatePass);



module.exports = router;