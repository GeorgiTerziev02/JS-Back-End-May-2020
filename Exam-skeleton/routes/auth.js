const { Router } = require('express');
const { registerUser } = require('../controllers/users');

const router = Router();

router.get('/register', (req, res) => {

});

router.post('/register', async (req, res) => {
    const status = await registerUser(req, res);

    if (!status) {
        return res.redirect(301, '/register');
    }

    res.redirect(301, '/');
});

router.get('/login', (req, res) => {

});

router.post('/login', async (req, res) => {
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