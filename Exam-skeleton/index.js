require('dotenv').config();

const env = process.env.NODE_ENV;

const express = require('express');
const config = require('./config/config')[env];
const { connectToDB } = require('./config/database');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();
//connectToDB();

require('./config/express')(app);

app.use('/', indexRouter);
app.use('/', authRouter);

app.get('*', (req, res) => {
    res
        .json('Route not found');
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}!`)
});