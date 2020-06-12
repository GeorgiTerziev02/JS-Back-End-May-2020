const express = require('express');
const handlebars = require('express-handlebars');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs')

    app.use('/static', express.static('static'));
};