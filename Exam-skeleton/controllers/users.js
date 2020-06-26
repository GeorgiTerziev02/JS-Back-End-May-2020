const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const registerUser = async (req, res) => {
    const {
        username,
        password,
        repeatPassword
    } = req.body;

    if (password !== repeatPassword) {
        return false;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = new User({ username, password: hashedPassword });
        const userObj = await user.save();

        const token = generateToken({
            userId: userObj._id,
            username: userObj.username
        });

        res.cookie('aid', token, { maxAge: 3600000 });

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

const verifyLogin = async (req, res) => {
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
        console.error(err);
        return false;
    }
};

module.exports = {
    registerUser
}