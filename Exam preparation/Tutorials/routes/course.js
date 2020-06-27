const { Router } = require('express');
const { authAccess } = require('../utils/auth');
const getUserStatus = require('../utils/status');

const router = Router();

router.get('/create', authAccess, getUserStatus, (req, res) => {
    res.render('create-course', {
        title: 'Create Course | Tutorials',
        isLoggedIn: req.isLoggedIn,
        username: req.username
    });
});

router.post('/create', authAccess, getUserStatus, (req, res) => {
    console.log(req.body);

    res.end();
});

module.exports = router;