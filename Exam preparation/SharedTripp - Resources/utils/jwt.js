const env = process.env.NODE_ENV;
const jwt = require('jsonwebtoken');
const config = require('../config/config')[env];

const generateToken = (data) => {
    return jwt.sign(data, config.privateKey, { expiresIn: '1h' });
};

const decodeToken = (token) => {
    try {
        const decodedObject = jwt.verify(token, config.privateKey);
        return decodedObject;
    } catch (err) {
        return false;
    }
};

module.exports = {
    generateToken,
    decodeToken
}