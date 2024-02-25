const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SEC_KEY, (err, data) => {
        console.log(err, data);
        if (err) res.sendStatus(403);
        req.user = data.user;
        next();
    })

};

module.exports = {
    authenToken,
};