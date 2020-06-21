require('dotenv').config();
const env = process.env.NODE_ENV;

const mongoose = require('mongoose');
const config = require('./config/config')[env];
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const cubeRouter = require('./routes/cube');
const accessoryRouter = require('./routes/accessory');
const { getUserStatus } = require('./controllers/user');

const app = require('express')();

mongoose.connect(config.databaseUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('hallo db');
    });

require('./config/express')(app);

app.use('/', authRouter);
app.use('/', cubeRouter);
app.use('/', accessoryRouter);
app.use('/', indexRouter);

app.get('*', getUserStatus, (req, res) => {
    res.render('404', {
        title: 'Error | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
});

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));