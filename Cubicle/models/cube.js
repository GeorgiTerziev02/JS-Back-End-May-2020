const mongoose = require('mongoose');

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        match: [/^[A-Za-z0-9 ]+$/, 'Name contains invalid characters']
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 2000,
        match: [/^[A-Za-z0-9 ]+$/, 'Description contains invalid characters']
    },
    imageUrl: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: 'ObjectId',
        ref: 'Accessory'
    }],
    creatorId:{
        type: 'ObjectId',
        required: true,
        ref: 'User'
    }
});

CubeSchema.path('imageUrl').validate(function (value) {
    return value.startsWith('http://') || value.startsWith('https://');
}, 'Image url is not valid');

module.exports = mongoose.model('Cube', CubeSchema);