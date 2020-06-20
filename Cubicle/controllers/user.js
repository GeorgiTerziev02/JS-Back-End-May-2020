const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// export to env variable
const privateKey = 'CUBE-WORKSHOP-SECRET-KEYY';

const generateToken = data => {
    const token = jwt.sign(data, privateKey);

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

    // get User by username
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

module.exports = {
    saveUser,
    verifyUser
}