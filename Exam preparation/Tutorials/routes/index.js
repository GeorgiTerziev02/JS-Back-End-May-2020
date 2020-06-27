const { Router } = require('express');
const getUserStatus = require('../utils/status');

const router = Router();

router.get('/', getUserStatus ,async (req, res)=>{
    res.render('home', {
        title: 'Home | Tutorials',
        isLoggedIn: req.isLoggedIn,
        username: req.username || ''
    });
});

module.exports = router;