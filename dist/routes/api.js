'use strict';

var express = require('express');
var models = require('../models');
var api = express.Router();

api.post("/send", function (req, res) {
   models.DissolvedOxygenReading.create({
      reading: req.body.reading,
      location: req.body.location
   }).then(res.status(201));
});

api.get("/list", function (req, res) {
   models.DissolvedOxygenReading.findAll().then(function (result) {
      res.status(200);
      res.send(result);
   });
});

module.exports = api;
//# sourceMappingURL=api.js.map