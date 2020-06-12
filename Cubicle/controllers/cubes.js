const { getCubes, getCube } = require('./database')

const getAllCubes = (callback) => {
    getCubes((cubes) => {
        callback(cubes);
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