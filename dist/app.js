'use strict';

var dotenv = require('dotenv').config();
var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var api = require('./routes/api.js');

var app = express();
var sequelize = new Sequelize(process.env.DB_CONN);

sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully.');
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', function (request, response) {
    response.send('DiO Service API!');
});
app.use('/api/v1', api);
app.use(function (req, res) {
    res.status(400);
    res.end('Not Found');
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;
//# sourceMappingURL=app.js.map