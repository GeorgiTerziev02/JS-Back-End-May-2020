require('dotenv').config();

const env = process.env.NODE_ENV;

const express = require('express');
const config = require('./config/config')[env];
const { connectToDB } = require('./config/database');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const playRouter = require('./routes/play');

const app = express();
connectToDB();

require('./config/express')(app);

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/play', playRouter);

app.get('*', (req, res) => {
    res.redirect(301, '/');
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}!`)
});