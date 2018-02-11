const express = require('express');
const models = require('../models');
const api = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const twilioEvent = require('../public/javascript/twilio');
const harvests = require('./harvest-routes');

// save new reading to the database
api.post('/do/readings', (req, res) => {
    twilioEvent.eventFilter(req.body.reading);
    models.Readings.create({
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
    models.Readings.findAll().then(readings => {
        res.status(200);
        res.send(readings);
    }).catch(err => {
        res.status(500);
        res.send(err);
    });
});

// get last 10 readings
api.get('/do/readings/recent', (req, res) => {
    models.Readings.findAll({
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
    models.Readings.findAll({
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

// get readings between start date and end date
api.get('/do/readings/query', (req, res) => {
    models.Readings.findAll({
        where: {
            createdAt: {
                [Op.between]: [req.query.start, req.query.end]
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

api.use('/harvests', harvests);

module.exports = api;