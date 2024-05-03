const { response } = require('express');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

class UserController {

    async pageLogin(req, res) {
        res.render("auth/login.ejs", { layout: "layouts/auth", data: null, title: "Đăng nhập" });
    }

    async login(req, res, next) {
        const { email, passWord } = req.body;
        try {
            const user = await User.findOne({ email: email, role: "admin" });

            if (!user) {
                throw "Không tìm thấy người dùng";
            }
            const hashPassword = user.passWord;
            const matches = await bcrypt.compare(passWord, hashPassword);
            if (!matches) {
                throw "Tên đăng nhập hoặc mật khẩu không hợp lệ";
            }
            // res.redirect("/bill");
            res.json("ok");
        } catch (error) {
            data.error = error;
            console.log(data);
            res.render("auth/login.ejs", {
                layout: "layouts/auth",
                data: data,
            });
        }
    }

    async show(req, res) {

        try {
            const array = await User.find();
            console.log(array.length);
            res.render("user/viewUser", {
                layout: "layouts/main",
                data: array,
                title: "Người dùng",
            });
        } catch (error) {
            res.json(error);
        }

    };
    async showUser(req, res) {

        try {
            const array = await User.findOne({_id : req.params.id});

            res.render("user/detailUser", {
                layout: "layouts/main",
                data: array,
                title: "Chi tiết người dùng",
            });
        } catch (error) {
            res.json(error);
        }

    };
    async create(req, res) {

        try {
            const array = await User.find();
            
            res.render("user/viewUser", {
                layout: "layouts/main",
                data: array,
                title: "Người dùng",
            });
        } catch (error) {
            res.json(error);
        }

    };

    async logout(req, res) {
        res.render("auth/logout", { layout: "layouts/main", title: "Đăng xuất" });
    }
    
    async logoutP(req, res) {
        req.logout(function (err) {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      }

}

module.exports = new UserController();