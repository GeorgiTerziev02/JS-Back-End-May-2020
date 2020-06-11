const fs = require('fs');
const path = require('path');
const { json } = require('express');

const dbPath = path.join(__dirname, '../config/database.json');

const getCubes = () => {
    const cubes = fs.readFileSync(dbPath);

    return JSON.parse(cubes);
}

module.exports = {
    getCubes
};