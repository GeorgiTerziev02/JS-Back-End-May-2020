const { Router } = require('express');
const { saveUser } = require('../controllers/user');
const router = Router();

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login  | Cube Workshop'
    });
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