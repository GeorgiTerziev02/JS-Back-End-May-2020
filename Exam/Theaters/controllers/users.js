const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const registerUser = async (req, res) => {
    const {
        username,
        password,
        repeatPassword
    } = req.body;

    if (!username.match(/^[A-Za-z0-9]+$/g) || username.length < 3) {
        return {
            status: false,
            error: 'Username should consist only english letters and digits!'
        };
    }

    if (!password.match(/^[A-Za-z0-9]+$/g) || password.length < 3) {
        return {
            status: false,
            error: 'Password should consist only english letters and digits!'
        };
    }

    if (password !== repeatPassword) {
        return {
            status: false,
            error: 'Passwords doesn\'t match!'
        };
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

        res.cookie('aid', token, { maxAge: 7200000 });

        return {
            status: true
        };
    } catch (err) {
        console.error(err);
        return {
            status: false
        };
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
            return {
                status: false,
                error: 'No such user and password combination exists!'
            };
        }

        const status = await bcrypt.compare(password, user.password);

        if (status) {
            const token = generateToken({
                userId: user._id,
                username: user.username
            });

            res.cookie('aid', token);
        }

        return {
            status: true
        };
    } catch (error) {
        console.error(err);
        return {
            status: false,
            error: 'Login failed!'
        };;
    }
};

module.exports = {
    registerUser,
    verifyLogin
}