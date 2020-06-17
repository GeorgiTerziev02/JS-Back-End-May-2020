const mongoose = require('mongoose');

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    imageUrl: {
        type: String,
        required: true
    },
    cubes: [{
        type: 'ObjectId',
        ref: 'Cubes'
    }]
});

AccessorySchema.path('imageUrl').validate(function (value) {
    return value.startsWith('http://') || value.startsWith('https://');
}, 'Image url is not valid');

module.exports = mongoose.model('Accessory', AccessorySchema);