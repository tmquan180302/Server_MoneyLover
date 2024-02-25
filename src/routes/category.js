const express = require('express');
const router = express.Router();

const categoryController = require('../app/controllers/CategoryController');
const { authenToken } = require('../middlewares/auth');


router.get('/getAll', authenToken, categoryController.showAll);
router.get('/:id', categoryController.show);
router.get('/create', authenToken, categoryController.create);
router.get('/update', categoryController.update);
router.get('/delete', categoryController.destroy);




module.exports = router;