const { Router } = require('express');
const { getCubeById, attachAccessoryById } = require('../controllers/cubes');
const { getOtherAccessories } = require('../controllers/accessories');
const Accessory = require('../models/accessory');
const { authAccess, getUserStatus } = require('../controllers/user');
const router = new Router();


router.get('/create/accessory', authAccess, getUserStatus, (req, res) => {
    res.render('createAccessory', {
        title: 'Create accessory',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/create/accessory', authAccess, async (req, res) => {
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

router.get('/attach/accessory/:id', authAccess, getUserStatus, async (req, res) => {
    const cube = await getCubeById(req.params.id);
    const accessories = await getOtherAccessories(cube.accessories.map(id => id.toString()));

    const canAttachAccessories = accessories.length > 0;

    res.render('attachAccessory', {
        title: 'Attach accessory',
        ...cube,
        accessories,
        canAttachAccessories,
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/attach/accessory/:id', authAccess, async (req, res) => {
    const {
        accessory
    } = req.body;
    const cubeId = req.params.id;

    await attachAccessoryById(cubeId, accessory);

    res.redirect(301, `/details/${cubeId}`);
});

module.exports = router;