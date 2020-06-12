const { getCubes, getCube } = require('./database')

const getAllCubes = (search, from, to, callback) => {
    getCubes((cubes) => {
        // TODO: do not use let
        let filteredCubes = cubes;
        if (search) {
            filteredCubes = cubes.filter(x => x.name.includes(search));
        }

        if (from) {
            filteredCubes = filteredCubes.filter(x => x.difficulty >= from);
        }

        if (to) {
            filteredCubes = filteredCubes.filter(x => x.difficulty <= to);
        }

        if (filteredCubes.length !== 0) {
            callback(filteredCubes);
        } else {
            callback(cubes);
        }
    })
}

const getCubeById = (id, callback) => {
    getCube(id, (cube) => {
        callback(cube)
    });
};

module.exports = {
    getAllCubes,
    getCubeById
};