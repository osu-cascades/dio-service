const express     = require('express');
const models      = require('../models');
const api         = express.Router();

api.post("/send", (req, res) => {
    models.DissolvedOxygenReading.create({
       reading: req.body.reading,
       location: req.body.location
   }).then(res.status(201));
});

api.get("/list", function(req, res) {
   models.DissolvedOxygenReading.findAll().then(result => {
       res.status(200);
       res.send(result);
   });
});

module.exports = api;