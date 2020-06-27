const env = process.env.NODE_ENV;
const mongoose = require('mongoose');
const config = require('./config')[env];

const connectToDB = () => {
    mongoose.connect(config.databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }, (err) => {
        if (err) {
            console.error(err);
            throw err;
        }

        console.log('Database is setup and running');
    });
};

module.exports = {
    connectToDB
}