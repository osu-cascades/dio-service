const express = require('express');
const models = require('../models');
const api = express.Router();

// save new reading to the database
api.post('/do/readings', (req, res) => {
    models.DissolvedOxygenReading.create({
        reading: req.body.reading,
        location: req.body.location
    }).then(() => {
        res.status(200);
        res.send(`Success`);
    }).catch(err => console.error(err));
});

// get all readings
api.get('/do/readings', (req, res) => {
    models.DissolvedOxygenReading.findAll().then(readings => {
        res.status(200);
        res.send(readings);
    }).catch(err => console.log(err));
});

// get last 10 readings
api.get('/do/readings/recent', (req, res) => {
    models.DissolvedOxygenReading.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']]
    })
        .then(readings => {
            res.status(200);
            res.send(readings);
        })
        .catch(error => {
            res.status(500);
            res.send(error);
        });
});

// get last reading
api.get('/do/readings/last', (req, res) => {
    models.DissolvedOxygenReading.findAll({
        limit: 1,
        order: [['createdAt', 'DESC']]
    })
        .then(reading => {
            res.status(200);
            res.send(reading)
        })
        .catch(error => {
            res.status(500);
            res.send(error);
        });
});

module.exports = api;