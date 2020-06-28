const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
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
        type: Boolean
    },
    createdAt: {
        type: String,
        required: true
    },
    creator: {
        type: 'ObjectId',
        required: true,
        ref: 'User'
    },
    usersEnrolled: [{
        type: 'ObjectId',
        ref: 'User' 
    }]
    // •	Is Public - boolean, default - false,
    // •	Created at – Date or String, required
    // •	Users Enrolled - a collection of Users
});

module.exports = mongoose.model('Course', courseSchema);