const express = require('express');
const models = require('../models');
const api = express.Router();
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// save new reading to the database
api.post('/do/readings', (req, res) => {
    models.DissolvedOxygenReading.create({
        reading: req.body.reading,
        location: req.body.location
    }).then(() => {
        res.status(200);
        res.send(`Success`);
    }).catch(err => {
        res.status(500);
        res.send(err);
    });
});

// get all readings
api.get('/do/readings', (req, res) => {
    models.DissolvedOxygenReading.findAll().then(readings => {
        res.status(200);
        res.send(readings);
    }).catch(err => {
        res.status(500);
        res.send(err);
    });
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
            res.send(reading);
        })
        .catch(error => {
            res.status(500);
            res.send(error);
        });
});

api.post('/do/readings/query', (req, res) => {
    let start = moment(req.startDate).format('YYYY-MM-DD HH:mm:ss');
    let end = moment(req.endDate).format('YYYY-MM-DD HH:mm:ss');
    models.DissolvedOxygenReading.findAll({
        where: {
            createdAt: {
                [Op.between]: [start, end]
            }
        }
    })
        .then(readings => {
            res.status(200);
            res.send(readings);
        })
        .catch(errors => {
            res.status(400);
            res.send(errors);
        })
});

module.exports = api;