const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username should be at least 5 symbols long'],
        maxlength: [50, 'Username should be less than 50 symbols long'],
        match: [/^[A-Za-z0-9]+$/, 'Username contains invalid characters']
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);