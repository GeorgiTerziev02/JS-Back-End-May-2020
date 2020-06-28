const { Router } = require('express');
const { registerUser, verifyLogin } = require('../controllers/users');
const { guestAccess, authAccess } = require('../utils/auth');
const getUserStatus = require('../utils/status');

const router = Router();

router.get('/register', guestAccess, getUserStatus, (req, res) => {
    const error = req.query.error ? req.query.error : null;
    res.render('register', {
        title: 'Register | Theaters',
        isLoggedIn: req.isLoggedIn,
        error
    });
});

router.post('/register', guestAccess, async (req, res) => {
    const result = await registerUser(req, res);

    if (!result.status) {
        return res.redirect(301, `/register?error=${result.error}`);
    }

    res.redirect(301, '/');
});

router.get('/login', guestAccess, getUserStatus, (req, res) => {
    const error = req.query.error ? req.query.error : null;
    res.render('login', {
        title: 'Login | Theaters',
        isLoggedIn: req.isLoggedIn,
        error
    });
});

router.post('/login', guestAccess, async (req, res) => {
    const result = await verifyLogin(req, res);

    if (!result.status) {
        return res.redirect(301, `/login?error=${result.error}`);
    }
    res.redirect(301, '/');
});

router.get('/logout', authAccess, (req, res) => {
    res.clearCookie('aid');

    res.redirect(301, '/');
});

module.exports = router;