'use strict';

var express = require('express');
var models = require('../models');
var api = express.Router();

api.post('/do/readings', function (req, res) {
    models.DissolvedOxygenReading.create({
        reading: req.body.reading,
        location: req.body.location
    }).then(function () {
        res.status(200);
        res.send('Success');
    }).catch(function (err) {
        return console.error(err);
    });
});

api.get('/do/readings', function (req, res) {
    models.DissolvedOxygenReading.findAll().then(function (readings) {
        res.status(200);
        res.send(readings);
    }).catch(function (err) {
        return console.log(err);
    });
});

module.exports = api;
//# sourceMappingURL=api.js.map