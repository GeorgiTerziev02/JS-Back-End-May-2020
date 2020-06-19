const { Router } = require('express');
const { getCubeById, attachAccessoryById } = require('../controllers/cubes');
const { getOtherAccessories } = require('../controllers/accessories');
const Accessory = require('../models/accessory');
const router = new Router();


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

module.exports = router;