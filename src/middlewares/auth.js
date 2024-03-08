const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function authenToken(req, res, next) {
    try {
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader.split(' ')[1];
        const data = jwt.verify(token, process.env.TOKEN_SEC_KEY);
        req.userId = data.user._id;
        console.log("req.userId",req.userId);
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(401);
    }


};

module.exports = {
    authenToken,
};