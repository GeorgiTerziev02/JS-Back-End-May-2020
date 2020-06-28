const { Router } = require('express');
const getUserStatus = require('../utils/status');
const { getAllPublic, getTopThree } = require('../controllers/plays');

const router = Router();

router.get('/', getUserStatus, async (req, res) => {
    if (req.isLoggedIn) {
        const plays = await getAllPublic(req.query.sort);
        res.render('home', {
            title: 'Home | Theaters',
            isLoggedIn: req.isLoggedIn,
            plays
        });
    } else {
        const plays = await getTopThree();
        res.render('home', {
            title: 'Home | Theaters',
            isLoggedIn: req.isLoggedIn,
            plays
        });
    }
});

module.exports = router;