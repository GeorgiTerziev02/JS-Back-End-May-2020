const Cube = require('../models/cube');

const getAllCubes = async (search, from, to) => {
    const searchValue = search || '';
    const fromValue = from || 0;
    const toValue = to || 6;

    const cubes = await Cube.find({ name: { $regex: searchValue, $options: "i" } }, function(err, data) {
                                if(err){
                                    console.error(err);
                                }
                            })
                          .where('difficulty')
                          .gte(fromValue)
                          .lte(toValue)
                          .lean();

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