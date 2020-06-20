const env = process.env.NODE_ENV || 'development'

const config = require('../config/config')[env];
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = data => {
    const token = jwt.sign(data, config.privateKey);

    return token;
};

const saveUser = async (req, res) => {
    const {
        username,
        password,
        repeatPassword
    } = req.body;

    if (password !== repeatPassword) {
        return false;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword });

    try {
        const userObject = await user.save();

        const token = generateToken({
            userId: userObject._id,
            username: userObject.username
        });

        res.cookie('aid', token);

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

const verifyUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user === null) {
            return false;
        }

        const status = await bcrypt.compare(password, user.password);

        if (status) {
            const token = generateToken({
                userId: user._id,
                username: user.username
            });

            res.cookie('aid', token);
        }

        return status;

    } catch (error) {
        console.error(error);
    }
};

const authAccess = (req, res, next) => {
    const token = req.cookies['aid'];
    if (!token) {
        return res.redirect('/');
    }

    try {
        const decodedObject = jwt.verify(token, config.privateKey);
        next();
    } catch (error) {
        res.redirect('/');
    }
};

const guestAccess = (req, res, next) => {
    const token = req.cookies['aid'];
    if (token) {
        return res.redirect('/');
    }

    next();
}

const getUserStatus = (req, res, next) => {
    const token = req.cookies['aid'];
    if(!token){
        req.isLoggedIn = false;
    }

    try {
        jwt.verify(token, config.privateKey);
        req.isLoggedIn = true;
    } catch (e) {
        req.isLoggedIn = false;
    }

    next();
}

const authAccessJSON = (req, res, next) => {
    const token = req.cookies['aid'];
    if(!token){
        return res.json({
            error: "Not authenticated"
        });
    }

    try {
        jwt.verify(token, config.privateKey);
        next();
    } catch (e) {
        return res.json({
            error: "Not authenticated"
        });
    }

    next();
}

module.exports = {
    saveUser,
    authAccess,
    guestAccess,
    verifyUser,
    getUserStatus,
    authAccessJSON
}