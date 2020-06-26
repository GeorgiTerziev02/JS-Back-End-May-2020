const env = process.env.NODE_ENV;
const jwt = require('jsonwebtoken');
const config = require('../config/config')[env];

const authAccess = async (req, res, next) => {
    const token = req.cookies['aid'];

    if (!token) {
        return res.redirect(301, '/');
    }

    try {
        await jwt.verify(token, config.privateKey);
        next();
    } catch (err) {
        console.error(err);
        res.redirect(301, '/');
    }
};

const guestAccess = (req, res, next) => {
    const token = req.cookies['aid'];
    if (token) {
        return res.redirect(301, '/');
    }

    next();
};

module.exports = {
    authAccess,
    guestAccess
}

