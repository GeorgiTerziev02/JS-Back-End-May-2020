const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticate = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(!authHeader){
        return res
            .status(401)
            .json({
            error: "Missing authorization header"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, config.privateKey);
        next();
    } catch (e) {
        return res
            .status(401)
            .json({
            error: "Not authenticated"
        });
    }
};

module.exports = {
    authenticate
}