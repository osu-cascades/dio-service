var express     = require('express'),
    api         = express.Router(),
    models    = require('../models');

api.post("/send", function(req, res) {
    models.sequelize.models.DissolvedOxygenReading.create({
       reading: req.body.reading,
       location: req.body.location
   })
       .then(res.send('readings saved'));
});

api.get("/list", function(req, res) {
   res.send("a GET request, eh?")
});

module.exports = api;