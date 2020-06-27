require('dotenv').config();

const env = process.env.NODE_ENV;

const express = require('express');
const config = require('./config/config')[env];
const { connectToDB } = require('./config/database');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const courseRouter = require('./routes/course');

const app = express();
connectToDB();

require('./config/express')(app);

app.use('/course', courseRouter);
app.use('/', indexRouter);
app.use('/', authRouter);

app.get('*', (req, res) => {
    res
        .redirect(301, '/');
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}!`)
});