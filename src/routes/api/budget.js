const express = require('express');
const router = express.Router();

const budgetController = require('../../app/controllers/api/BudgetController');
const { authenToken } = require('../../middlewares/auth');





// Báo cáo toàn kì
router.get('/allTimeReport', authenToken, budgetController.getAllTimeReport);

// Lấy dữ liệu các bản ghi theo danh mục (Phần onlick của của báo cáo)
router.get('/:id/report', budgetController.getCateroryReport);

// Gửi lên req là key
router.post('/find', budgetController.searchAll);

// Báo cáo danh mục toàn kỳ
router.get('/:type', budgetController.getAllReport);

// Lấy dữ liệu báo cáo trong năm 
// Chi tiêu params type = 0 
// Thu nhập params type = 1
// Tổng params type = 2
router.get('/:startDay/:endDay/:type/year', authenToken, budgetController.getYearReport);

//Lấy dữ liệu fragment báo và màn báo cáo danh mục trong năm 
// Lấy theo năm thì lấy 1/1/2024 (dạng miliseacond) đến 31/12/2024 (dạng miliseacond)
router.get('/:startDay/:endDay/:type', authenToken, budgetController.getReport);

//Lấy dữ liệu màn Calendar
router.get('/:startDay/:endDay',authenToken, budgetController.getCalendar);

//Tìm kiếm

router.delete('/:id', authenToken, budgetController.destroy);
router.post('/update', authenToken, budgetController.update);
router.post('/create', authenToken, budgetController.create);
router.get('/:id', authenToken, budgetController.show);
router.get('/', authenToken, budgetController.showAll);



module.exports = router;