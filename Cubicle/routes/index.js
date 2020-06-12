const { Router } = require('express');
const { getAllCubes, getCubeById } = require('../controllers/cubes');
const Cube = require('../models/cube');

const router = Router();

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create  | Cube Workshop'
    });
})

router.post('/create', (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    const cube = new Cube(name,description,imageUrl, difficultyLevel);
    cube.save(()=>{
        res.redirect(301, '/');
    })
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop'
    });
});

router.get('/details/:id', (req, res) => {
    getCubeById(req.params.id, (cube) => {
        res.render('details', {
            title: 'Details | Cube Workshop',
            ...cube
        });
    })
});

router.get('/', (req, res) => {
    getAllCubes((cubes) => {
        res.render('index', {
            title: 'Cube Workshop',
            cubes: cubes
        });
    })
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error | Cube Workshop'
    });
});

module.exports = router;
