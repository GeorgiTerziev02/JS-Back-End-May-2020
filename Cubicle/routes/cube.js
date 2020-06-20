const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env];

const { Router } = require('express');
const Cube = require('../models/cube');
const { getCubeById, getCubeByIdWithAccessories, deleteCubeById } = require('../controllers/cubes');
const jwt = require('jsonwebtoken');
const { authAccess, getUserStatus } = require('../controllers/user');

const router = Router();

router.get('/create', authAccess, getUserStatus, (req, res) => {
    res.render('create', {
        title: 'Create  | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/create', authAccess, (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const token = req.cookies['aid'];
    const decodedObject = jwt.verify(token, config.privateKey);

    const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel, creatorId: decodedObject.userId });

    cube.save((err) => {
        if (err) {
            console.error(err);
            res.redirect(301, '/create');
        } else {
            res.redirect(301, '/');
        }
    })
});

router.get('/details/:id', getUserStatus, async (req, res) => {
    const cube = await getCubeByIdWithAccessories(req.params.id);
    res.render('details', {
        title: 'Details | Cube Workshop',
        ...cube,
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/edit/:id', authAccess, getUserStatus, async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getCubeById(cubeId);

    res.render('editCube', {
        title: 'Edit cube',
        ...cube,
        isLoggedIn: req.isLoggedIn
    });
})

router.get('/delete/:id', authAccess, getUserStatus, async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getCubeById(cubeId);

    res.render('deleteCube', {
        title: 'Delete cube',
        ...cube,
        isLoggedIn: req.isLoggedIn
    });
})

router.post('/delete/:id', authAccess, async (req, res) => {
    await deleteCubeById(req.params.id);
    
    res.redirect(301, '/');
})

module.exports = router;