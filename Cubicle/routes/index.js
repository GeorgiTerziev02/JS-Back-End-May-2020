const { Router } = require('express');
const { getAllCubes, getCubeById, attachAccessoryById, getCubeByIdWithAccessories } = require('../controllers/cubes');
const { getOtherAccessories } = require('../controllers/accessories');
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

const router = Router();

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create  | Cube Workshop'
    });
})

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

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop'
    });
});

router.get('/details/:id', async (req, res) => {
    const cube = await getCubeByIdWithAccessories(req.params.id);
    res.render('details', {
        title: 'Details | Cube Workshop',
        ...cube
    });
});

router.get('/', async (req, res) => {
    const { search, from, to } = req.query;
    res.render('index', {
        title: 'Cube Workshop',
        cubes: await getAllCubes(search, from, to)
    });
});

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create accessory'
    });
});

router.post('/create/accessory', async (req, res) => {
    const { name, description, imageUrl } = req.body;
    const accessory = new Accessory({
        name,
        description,
        imageUrl
    });

    try {
        await accessory.save();
    } catch (err) {
        console.error(err);
        res.redirect('/create');
    }

    res.redirect(301, '/');
});

router.get('/attach/accessory/:id', async (req, res) => {
    const cube = await getCubeById(req.params.id);
    const accessories = await getOtherAccessories(cube.accessories.map(id => id.toString()));

    const canAttachAccessories = accessories.length > 0;

    res.render('attachAccessory', {
        title: 'Attach accessory',
        ...cube,
        accessories,
        canAttachAccessories
    });
});

router.post('/attach/accessory/:id', async (req, res) => {
    const {
        accessory
    } = req.body;
    const cubeId = req.params.id;

    await attachAccessoryById(cubeId, accessory);

    res.redirect(301, `/details/${cubeId}`);
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error | Cube Workshop'
    });
});

module.exports = router;
