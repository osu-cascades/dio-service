const express     = require('express');
const models      = require('../models');
const api         = express.Router();


api.post('/do', (req, res) => {
    models.DissolvedOxygenReading.create({
       reading: req.body.reading,
       location: req.body.location
    }).then(() => {
        res.status(200);
        res.send(`Success`);
    }).catch(err => console.error(err));
});

api.get('/do/last', (req, res) => {
    models.DissolvedOxygenReading.findOne({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ] ]
    }).then(reading => {
        res.status(200);
        res.send(reading);
    }).catch(err => console.log(err));
});

api.get('/do/all', function(req, res) {
   models.DissolvedOxygenReading.findAll().then(result => {
       res.status(200);
       res.send(result);
   }).catch(err => console.log(err));
});

module.exports = api;