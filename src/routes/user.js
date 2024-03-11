const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const { authenToken } = require('../middlewares/auth');

router.post('/login', authenToken, userController.login);
router.post('/loginGoogle',authenToken, userController.loginGoogle);
router.post('/register',authenToken, userController.create);
router.post('/updatePass',authenToken, userController.updatePass);





module.exports = router;