const User = require('../models/user');

const registerUser = (email, password) => {
    const user = new User({ email, password });

    user.save((err) => {
        console.error(err); 
    })
};

module.exports = {
    registerUser
}