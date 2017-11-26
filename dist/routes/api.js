'use strict';

var express = require('express');
var models = require('../models');
var api = express.Router();

api.post('/do', function (req, res) {
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

api.get('/do/last', function (req, res) {
    models.DissolvedOxygenReading.findOne({
        limit: 1,
        order: [['createdAt', 'DESC']]
    }).then(function (reading) {
        res.status(200);
        res.send(reading);
    }).catch(function (err) {
        return console.log(err);
    });
});

api.get('/do/all', function (req, res) {
    models.DissolvedOxygenReading.findAll().then(function (result) {
        res.status(200);
        res.send(result);
    }).catch(function (err) {
        return console.log(err);
    });
});

module.exports = api;
//# sourceMappingURL=api.js.map