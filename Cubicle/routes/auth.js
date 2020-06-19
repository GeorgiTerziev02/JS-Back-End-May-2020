const { Router } = require('express');
const router = new Router();

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


module.exports = router;