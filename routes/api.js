const express     = require('express');
const models      = require('../models');
const api         = express.Router();

api.post('/do/readings', (req, res) => {
    models.DissolvedOxygenReading.create({
       reading: req.body.reading,
       location: req.body.location
    }).then(() => {
        res.status(200);
        res.send(`Success`);
    }).catch(err => console.error(err));
});

api.get('/do/readings', function(req, res) {
    models.DissolvedOxygenReading.findAll().then(readings => {
       res.status(200);
       res.send(readings);
    }).catch(err => console.log(err));
});

module.exports = api;