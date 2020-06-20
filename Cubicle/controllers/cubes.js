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

const editCubeById = async(cubeId, name, description, imageUrl, difficultyLevel) =>{
    try {
        await Cube.findByIdAndUpdate(cubeId, {name, description,imageUrl, difficulty: difficultyLevel});
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const deleteCubeById = async (cubeId) =>{
    try {
        await Cube.findByIdAndDelete(cubeId);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllCubes,
    getCubeById,
    getCubeByIdWithAccessories,
    attachAccessoryById,
    editCubeById,
    deleteCubeById
};