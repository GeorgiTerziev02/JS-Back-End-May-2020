const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
    },
    createdAt: {
        type: String,
        required: true
    },
    creator: {
        type: 'ObjectId',
        ref: 'User',
        required: true
    },
    usersLiked: [{
        type: 'ObjectId',
        ref: 'User'
    }]
});

module.exports = mongoose.model('Play', playSchema);