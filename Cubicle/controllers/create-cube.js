const Cube = require('../models/cube');

const newCube = new Cube('dad', 'sdada', 'dasda', 4);

console.log(newCube);

newCube.save();