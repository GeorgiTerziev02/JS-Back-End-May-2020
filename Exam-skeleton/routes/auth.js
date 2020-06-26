const { Router } = require('express');
const { registerUser } = require('../controllers/users');
const { guestAccess, authAccess } = require('../utils/auth');

const router = Router();

router.get('/register', guestAccess, (req, res) => {
    res.json('register page');
});

router.post('/register', guestAccess, async (req, res) => {
    const status = await registerUser(req, res);

    if (!status) {
        return res.redirect(301, '/register');
    }

    res.redirect(301, '/');
});

router.get('/login', guestAccess, (req, res) => {
    res.json('login page');
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