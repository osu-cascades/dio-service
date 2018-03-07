const dotenv = require('dotenv').config();
const express = require('express');
const models = require('../models');
const api = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const twilioEvent = require('../public/javascript/twilio');
const harvests = require('./harvest-routes');
const moment = require('moment');

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
    sendDataToJimsDatabase(req.body.reading);
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

let sendDataToJimsDatabase = (reading, location) => {
    let loc;
    switch (location) {
        case 'TANK 1':
            loc = 1;
            break;
        case 'TANK 2':
            loc = 2;
            break;
        default:
            loc = 0;
    }

    let knex = require('knex')({
        client: 'mysql2',
        connection: {
            host: process.env.jimDBHost,
            user: process.env.jimDBUser,
            password: process.env.jimDBPass,
            database: process.env.jimDB,
            port: process.env.jimDBPort
        },
    });

    knex.insert({heading: 'DO', value: reading, datestamp: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), location: loc, post_type: 'DO', grow_level: 'Tank'})
        .into('monitoring')
        .then((response) => {
            console.log(response);
        })
        .catch((errors) => {
            console.log(errors);
        });
};