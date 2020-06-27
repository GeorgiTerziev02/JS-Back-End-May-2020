const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV;
const config = require('../config/config')[env];

const getUserStatus = (req, res, next) => {
    const token = req.cookies['aid'];
    if(!token){
        req.isLoggedIn = false;
        return next();
    }

    try {
        const userObj = jwt.verify(token, config.privateKey);
        req.userId = userObj.userId;
        req.email = userObj.email;
        req.isLoggedIn = true;
    } catch (e) {
        console.error(e);
        req.isLoggedIn = false;
    }

    next();
}

module.exports = getUserStatus;