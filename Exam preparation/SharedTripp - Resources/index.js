require('dotenv').config();

const env = process.env.NODE_ENV;

const express = require('express');
const config = require('./config/config')[env];
const { connectToDB } = require('./config/database');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const trippsRouter = require('./routes/tripps');
const getUserStatus = require('./utils/status');

const app = express();
connectToDB();

require('./config/express')(app);

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', trippsRouter);

app.get('*', getUserStatus, (req, res) => {
    res.render('404', {
        title: 'Not Found | Shared Tripp',
        isLoggedIn: req.isLoggedIn,
        email: req.isLoggedIn ? req.email : ''
    });
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}!`)
});