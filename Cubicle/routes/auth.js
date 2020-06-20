const { Router } = require('express');
const { saveUser, verifyUser, guestAccess, getUserStatus, authAccess } = require('../controllers/user');
const router = Router();

router.get('/login', guestAccess, getUserStatus, (req, res) => {
    res.render('login', {
        title: 'Login  | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/login', guestAccess, async (req, res) => {
    const status = await verifyUser(req, res);

    if (!status) {
        return res.redirect(301, '/login');
    }

    res.redirect('/');
});

router.get('/register', guestAccess, getUserStatus, (req, res) => {
    res.render('register', {
        title: 'Register  | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/register', guestAccess, async (req, res) => {
    const status = await saveUser(req, res);

    if (!status) {
        return res.redirect(301, '/register');
    }

    res.redirect('/');
});

router.get('/logout', authAccess, (req, res) => {
    res.clearCookie('aid');

    res.redirect(301, '/');
});


module.exports = router;