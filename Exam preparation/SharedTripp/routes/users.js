const { Router } = require('express');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login | Shared Trip'
    });
});

router.post('/login', async (req, res) => {
    res.redirect(301, '/');
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register | Shared Trip'
    });
});

router.post('/register', async (req, res) => {
    console.log(req.body);
    res.redirect(301, '/');
})

module.exports = router;