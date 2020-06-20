const { Router } = require('express');
const Cube = require('../models/cube');
const { getCubeById, getCubeByIdWithAccessories } = require('../controllers/cubes');
const router = Router();

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create  | Cube Workshop'
    });
});

router.post('/create', (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel });

    cube.save((err) => {
        if (err) {
            console.error(err);
            res.redirect(301, '/create');
        } else {
            res.redirect(301, '/');
        }
    })
});

router.get('/details/:id', async (req, res) => {
    const cube = await getCubeByIdWithAccessories(req.params.id);
    res.render('details', {
        title: 'Details | Cube Workshop',
        ...cube
    });
});

router.get('/edit/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getCubeById(cubeId);

    res.render('editCube',{
       title: 'Edit cube',
       ...cube
    });
})

router.get('/delete/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getCubeById(cubeId);

    res.render('deleteCube',{
       title: 'Delete cube',
       ...cube
    });
})

module.exports = router;