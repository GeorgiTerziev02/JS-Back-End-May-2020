const { Router } = require('express');
const { registerUser, verifyLogin } = require('../controllers/users');
const { guestAccess, authAccess } = require('../utils/auth');
const getUserStatus = require('../utils/status');

const router = Router();

router.get('/register', guestAccess, getUserStatus, (req, res) => {
    res.render('register', {
        title: 'Register | Tutorials',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/register', guestAccess, async (req, res) => {
    const status = await registerUser(req, res);

    if (!status) {
        return res.redirect(301, '/register');
    }

    res.redirect(301, '/');
});

router.get('/login', guestAccess, getUserStatus, (req, res) => {
    res.render('login', {
        title: 'Login | Tutorials',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/login', guestAccess, async (req, res) => {
    const status = await verifyLogin(req, res);

    if (!status) {
        res.redirect(301, '/login')
    }
    res.redirect(301, '/');
});

router.get('/logout', authAccess, (req, res) => {
    res.clearCookie('aid');

    res.redirect(301, '/');
});

module.exports = router;