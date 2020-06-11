// TODO: Require Controllers...
const { Router } = require('express');
const { getCubes } = require('../controllers/cubes');

const router = Router();

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create  | Cube Workshop'
    });
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop'
    });
});

router.get('/details/:id', (req, res) => {
    res.render('details', {
        title: 'Details | Cube Workshop'
    });
});

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Cube Workshop',
        cubes: getCubes()
    });
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error | Cube Workshop'
    });
});

module.exports = router;
