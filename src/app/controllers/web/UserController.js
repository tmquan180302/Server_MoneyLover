const User = require('../../models/User');

class UserController {
    test(req, res, next) {
        res.render('dashboard/dashboard');
    }
}

module.exports = new UserController();