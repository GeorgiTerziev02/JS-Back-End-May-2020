const { Router } = require('express');
const { saveUser, verifyUser, guestAccess, getUserStatus, authAccess } = require('../controllers/user');
const router = Router();

router.get('/login', guestAccess, getUserStatus, (req, res) => {
    const error = req.query.error ? 'Username/Password is not valid' : null;
    res.render('login', {
        title: 'Login  | Cube Workshop',
        isLoggedIn: req.isLoggedIn,
        error
    });
});

router.post('/login', guestAccess, async (req, res) => {
    const status = await verifyUser(req, res);

    if (!status) {
        return res.redirect(301, '/login?error=true');
    }

    res.redirect('/');
});

router.get('/register', guestAccess, getUserStatus, (req, res) => {
    const error = req.query.error ? 'Username/Password is not valid!' : null;
    res.render('register', {
        title: 'Register  | Cube Workshop',
        isLoggedIn: req.isLoggedIn,
        error
    });
});

router.post('/register', guestAccess, async (req, res) => {
    const status = await saveUser(req, res);

    if (!status) {
        return res.redirect(301, '/register?error=true');
    }

    res.redirect('/');
});

router.get('/logout', authAccess, (req, res) => {
    res.clearCookie('aid');

    res.redirect(301, '/');
});


module.exports = router;