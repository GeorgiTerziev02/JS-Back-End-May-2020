const mongoose = require('mongoose');

const AccessorySchema = new mongoose.Schema({
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
        maxlength: 2000,
        minlength: 5,
        maxlength: 2000,
        match: [/^[A-Za-z0-9 ]+$/, 'Description contains invalid characters']
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