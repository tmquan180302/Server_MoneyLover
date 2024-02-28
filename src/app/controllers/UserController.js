const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const salt = bcrypt.genSaltSync(10);


class UserController {




    async login(req, res, next) {

        try {
            const { email, passWord } = req.body;
            console.log(email, passWord);

            await User.findOne({ email: email })
                .then(async (result) => {
                    if (!result) {
                        res.status(500).json({ error: 'Internal server error' });
                    } else if (result) {
                        let checkPass = await bcrypt.compare(passWord, result.passWord);
                        if (checkPass == true) {
                            const acessToken = jwt.sign({ user: result }, process.env.TOKEN_SEC_KEY, { expiresIn: '30m' })
                            res.json({ token: acessToken });
                        } else {
                            res.status(404).json({ error: 'Not Found' });
                        }

                    }
                });
        } catch (err) {
            console.error('Error find user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }


    }

    // [POST]  user/login
    async loginGoogle(req, res, next) {
        try {
            const { email } = req.body;
            console.log(email);
            await User.findOne({ email: email })
                .then((result) => {
                    if (!result) {
                        res.status(500).json({ error: 'Internal server error' });
                    } else if (result) {
                        const acessToken = jwt.sign({ user: result }, process.env.TOKEN_SEC_KEY, { expiresIn: '30m' })
                        res.json({ token: acessToken });
                    }
                });
        } catch (err) {
            console.error('Error fething user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    //[POST] user/register
    async create(req, res, next) {
        try {
            const { email, passWord } = req.body;
            console.log(passWord);
            const hassPass = bcrypt.hashSync(passWord, salt);
            const data = new User({ email: email, passWord: hassPass });
            const user = await data.save()
            res.json(user);
        } catch (err) {
            console.error('Error adding user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    async updatePass(req, res, next) {
        try {
            const { oldPassWord, newPassWord } = req.body;
            const hassPass = bcrypt.hashSync(newPassWord, salt);
            await User.findOne({ _id: req.user })
                .then(async (result) => {
                    let checkPass = await bcrypt.compare(oldPassWord, result.passWord);
                    if (checkPass == true) {
                        await User.findOneAndUpdate({ _id: req.user }, { passWord: hassPass }, { new: true },)
                            .then((result) => {
                                res.json(result);
                            });
                    } else {
                        res.status(404).json({ error: 'Not Found' });
                    }
                })

        } catch (err) {
            console.error('Error fixing user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

module.exports = new UserController();

