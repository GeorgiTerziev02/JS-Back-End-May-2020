const Cube = require('../models/cube');
const cube = require('../models/cube');
const accessory = require('../models/accessory');

const getAllCubes = async (search, from, to) => {
    // getCubes((cubes) => {
    //     // TODO: do not use let
    //     let filteredCubes = cubes;
    //     if (search) {
    //         filteredCubes = cubes.filter(x => x.name.includes(search));
    //     }

    //     if (from) {
    //         filteredCubes = filteredCubes.filter(x => x.difficulty >= from);
    //     }

    //     if (to) {
    //         filteredCubes = filteredCubes.filter(x => x.difficulty <= to);
    //     }

    //     if (filteredCubes.length !== 0) {
    //         callback(filteredCubes);
    //     } else {
    //         callback(cubes);
    //     }
    // })

    // TODO: Implement search
    const cubes = await Cube.find().lean();
    return cubes;
}

const getCubeById = async (id) => {
    const cube = await Cube.findById(id).lean();
    return cube;
};

const getCubeByIdWithAccessories = async (id) => {
    const cube = await Cube.findById(id).populate('accessories').lean();
    return cube;
};

const attachAccessoryById = async (cubeId, accessoryId) => {
    const cube = await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {
        accessories: [accessoryId]
        }
    });
};

module.exports = {
    getAllCubes,
    getCubeById,
    getCubeByIdWithAccessories,
    attachAccessoryById
};