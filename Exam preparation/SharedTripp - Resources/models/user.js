const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tripHistory: [{
        type: 'ObjectId',
        ref: 'Trip'
    }]
});

module.exports = mongoose.model('User', userSchema);