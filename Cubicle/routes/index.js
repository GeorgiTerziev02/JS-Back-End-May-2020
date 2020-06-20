const { Router } = require('express');
const { getAllCubes } = require('../controllers/cubes');
const { getUserStatus } = require('../controllers/user');

const router = Router();

router.get('/about', getUserStatus, (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/', getUserStatus, async (req, res) => {
    const { search, from, to } = req.query;
    const returnedCubes = await getAllCubes(search, from, to);
    if (returnedCubes.length === 0) {
        res.redirect('/');
        return;
    }
    res.render('index', {
        title: 'Cube Workshop',
        cubes: returnedCubes,
        isLoggedIn: req.isLoggedIn
    });
});

module.exports = router;
