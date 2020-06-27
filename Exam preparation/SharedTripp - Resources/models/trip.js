const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        required: true
    },
    endPoint: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    carImage: {
        type: String,
        required: true
    },
    creator: {
        type: 'ObjectId',
        required: true
    },
    buddies: [{
        type: 'ObjectId',
        ref: 'User'
    }]
});

module.exports = mongoose.model('Trip', tripSchema);