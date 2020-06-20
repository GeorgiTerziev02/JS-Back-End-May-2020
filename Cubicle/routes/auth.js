const { Router } = require('express');
const { saveUser, verifyUser } = require('../controllers/user');
const router = Router();

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login  | Cube Workshop'
    });
});

router.post('/login', async (req, res) => {
    const status = await verifyUser(req, res);

    if(!status){
        return res.redirect(301, '/login');
    }

    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register  | Cube Workshop'
    });
});

router.post('/register', async (req, res) => {
    const status = await saveUser(req, res);

    if(!status){
        return res.redirect(301, '/register');
    }

    res.redirect('/');
});


module.exports = router;