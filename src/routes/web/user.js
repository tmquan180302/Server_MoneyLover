const express = require('express');
const router = express.Router();

const userController = require('../../app/controllers/web/UserController');

router.get('/' , userController.test);


module.exports = router;