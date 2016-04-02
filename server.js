'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js')

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

routes(app);

app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port...');
});