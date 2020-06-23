const { Router } = require('express');
const Cube = require('../models/cube');
const { authenticate } = require('../utils/auth');

const router = Router();

const cubeNotFoundMessage = 'Cube with the given id doesn\'t exist';

router.get('/', async (req, res) => {
    const cubes = await Cube.find().lean();

    res
        .status(200)
        .json({
            cubes
        });
});

router.post('/', authenticate, async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = req.body;

    const cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty
    });

    try {
        await cube.save();
        res
            .status(201)
            .json({
                message: `Cube - ${name} is successfully created`
            });
    } catch (error) {
        res
            .status(400)
            .json({
                message: error.message
            });
    }
});

router.patch('/:id', async (req, res) => {
    const cubeId = req.params.id;

    const {
        name,
        description,
        imageUrl,
        difficulty
    } = req.body;

    const newData = {};

    name && (newData.name = name)
    description && (newData.description = description)
    imageUrl && (newData.imageUrl = imageUrl)
    difficulty && (newData.difficulty = difficulty)

    // TODO: Validate newData
    try {
        await Cube.findByIdAndUpdate(cubeId, newData);

        res
            .status(200)
            .json({
                message: 'Cube updated successfully'
            });

    } catch (error) {
        res
            .status(404)
            .json({
                message: cubeNotFoundMessage
            });
    }
});

router.delete('/:id', async (req, res) => {
    const cubeId = req.params.id;

    try {
        await Cube.findByIdAndDelete(cubeId);

        res
            .status(204)
            .json({
                message: 'Cube was deleted successfully'
            });
    } catch (error) {
        res
            .status(404)
            .json({
                message: cubeNotFoundMessage
            });
    }
})

module.exports = router;