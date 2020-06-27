const { Router } = require('express');
const getUserStatus = require('../utils/status');

const router = Router();

router.get('/', getUserStatus, async (req, res) => {
    res.render('home', {
        title: 'Home | Shared Tripp',
        isLoggedIn: req.isLoggedIn,
        email: req.isLoggedIn ? req.email : ''
    });
});

module.exports = router;