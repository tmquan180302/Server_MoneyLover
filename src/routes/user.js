const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const { authenToken } = require('../middlewares/auth');

router.post('/login', userController.login);
router.post('/loginGoogle', userController.loginGoogle);
router.post('/register', userController.create);
router.post('/updatePass',authenToken, userController.updatePass);



module.exports = router;