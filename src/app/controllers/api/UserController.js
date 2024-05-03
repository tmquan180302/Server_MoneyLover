const User = require('../../models/User');
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

            const user = await User.findOne({ email: email })
            if (!user) {
                res.status(404).json({ error: 'Not Found' });
            }
            let checkPass = await bcrypt.compare(passWord, user.passWord);
            if (checkPass == true) {
                const acessToken = await jwt.sign({ user: user }, process.env.TOKEN_SEC_KEY)
                res.json({ token: acessToken });
            }
        }
        catch (err) {
            console.error('Error find user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }


    }

    // [POST]  user/login
    async loginGoogle(req, res, next) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email: email });
            if (!user) {
                res.status(404).json({ error: 'Not found' });
            }
            const acessToken = jwt.sign({ user: user }, process.env.TOKEN_SEC_KEY, { expiresIn: '30m' })
            res.json({ token: acessToken });
        } catch (err) {
            console.error('Error fething user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    //[POST] user/register
    async create(req, res, next) {
        try {
            const { email, passWord, fullName } = req.body;
            const hassPass = bcrypt.hashSync(passWord, salt);
            const data = new User({ email: email, passWord: hassPass, fullName: fullName });

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
            const user = await User.findOne({ _id: req.user });

            if (!user) {
                res.status(404).json({ error: 'Not Found' });
            }

            let checkPass = await bcrypt.compare(oldPassWord, user.passWord);
            if (checkPass == true) {
                const userUpdate = await User.findOneAndUpdate({ _id: req.user }, { passWord: hassPass }, { new: true },)
                res.json(userUpdate);
            }

        } catch (err) {
            console.error('Error fixing user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

module.exports = new UserController();

