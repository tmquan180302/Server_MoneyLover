const express = require('express');
const router = express.Router();

const userController = require('../../app/controllers/web/UserController');
const { passport } = require('../../utils/authModule');
const { checkAdmin } = require('../../middlewares/auth');


router.post('/login', passport.authenticate('local', { failureRedirect: '/user/login', successRedirect: '/bill/dashboard', failureFlash: true }));

// passport.authenticate('local',{ failureRedirect: '/user/login', successRedirect: '/bill/dashboard', failureFlash: true })
router.get('/login', userController.pageLogin);

router.use(checkAdmin);

router.get('/', userController.show);
router.get('/detail/:id', userController.showUser);

router.get('/logout', userController.logout)
router.get('/logoutP', userController.logoutP)

module.exports = router;