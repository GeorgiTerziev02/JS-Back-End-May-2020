const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../config/database.json');

const saveCube = (cube, callback) => {
    const cubes = getCubes((cubes) => {
        cubes.push(cube);

        fs.writeFile(dbPath, JSON.stringify(cubes), (err) => {
            if (err) {
                throw err;
            }

            console.log('The new cube was successfully stored!');
            callback();
        })
    });
}

const getCube = (id, callback) => {
    getCubes(cubes => {
        const cube = cubes.filter(c => c.id === id)[0];
        callback(cube);
    });
}

const getCubes = (callback) => {
    fs.readFile(dbPath, 'utf-8', (err, db) => {
        if (err) {
            throw err;
        }

        let cubes = JSON.parse(db);
        callback(cubes);
    })
}

module.exports = {
    getCube,
    getCubes,
    saveCube
};