const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    trippHistory: [{
        type: 'ObjectId',
        ref: 'Tripp'
    }]
});

module.exports = mongoose.model('User', userSchema);