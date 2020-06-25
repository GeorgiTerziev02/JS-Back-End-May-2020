require('dotenv').config();

const env = process.env.NODE_ENV;

const express = require('express');
const config = require('./config/config')[env];
const { connectToDB } = require('./config/database');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
connectToDB();

require('./config/express')(app);

app.use('/', indexRouter);
app.use('/', usersRouter);

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 | Shared Trip'
    });
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}!`)
});