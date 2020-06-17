const env = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose');
const config = require('./config/config')[env];
const indexRouter = require('./routes');
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

app.use('/', indexRouter);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));