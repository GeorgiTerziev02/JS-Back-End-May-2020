const { Router } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const router = Router();

const generateToken = data => {
    const token = jwt.sign(data, config.privateKey, { expiresIn: '1h' });

    return token;
};

router.post('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user === null) {
            return res
                .status(404)
                .json({
                    message: "User not found!"
                });
        }

        const status = await bcrypt.compare(password, user.password);

        if (status) {
            const token = generateToken({
                userId: user._id,
                username: user.username
            });

            return res
                .status(200)
                .json({
                    token
                });
        } else {
            return res
                .status(400)
                .json({
                    message: "Wrong credential"
                });
        }

    } catch (error) {
        return res
            .status(400)
            .json({
                message: "Wrong credentials!"
            });
    }
});

module.exports = router;