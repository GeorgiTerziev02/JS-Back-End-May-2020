const { Router } = require('express');
const { getAllCubes } = require('../controllers/cubes');

const router = Router();

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop'
    });
});

router.get('/', async (req, res) => {
    const { search, from, to } = req.query;
    const returnedCubes = await getAllCubes(search, from, to);
    if (returnedCubes.length === 0) {
        res.redirect('/');
        return;
    }
    res.render('index', {
        title: 'Cube Workshop',
        cubes: returnedCubes
    });
});

module.exports = router;
