const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const salt = bcrypt.genSaltSync(10);


class UserController {

  

    // [POST]  user/login
    async login(req, res, next) {
        try {
            const { email } = req.body;
            console.log(email);
            await User.findOne({ email: email })
                .then((result) => {
                    if (!result) {
                        res.status(500).json({ error: 'Internal server error' });
                    } else if (result) {
                        const acessToken = jwt.sign({ user: result }, process.env.TOKEN_SEC_KEY, { expiresIn: '5m' })
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
            await data.save()
                .then((result) => res.json(result))

        } catch (err) {
            console.error('Error adding user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

}

module.exports = new UserController();

