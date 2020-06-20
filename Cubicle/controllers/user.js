const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// export to env variable
const privateKey = 'CUBE-WORKSHOP-SECRET-KEYY';

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

        const token = jwt.sign({
            userId: userObject._id,
            username: userObject.username
        }, privateKey);

        res.cookie('aid', token);

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

module.exports = {
    saveUser
}