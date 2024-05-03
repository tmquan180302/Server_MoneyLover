const express = require('express');
const router = express.Router();

const serviceController = require('../../app/controllers/web/ServiceController');
const { checkAdmin } = require('../../middlewares/auth');

router.use(checkAdmin);

router.get('/', serviceController.show);
router.get('/add', serviceController.getPageCreate);
router.post('/add', serviceController.create);
router.get('/:id', serviceController.showDetail);
router.get('/:id/edit', serviceController.getPageEdit);
router.post('/:id/edit', serviceController.edit);
router.delete('/delete/:id', serviceController.delete);


module.exports = router;