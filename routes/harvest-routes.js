const express = require('express');
const models = require('../models');
const harvests = express.Router();
const Sequelize = require('sequelize');
const moment = require('moment');

// get all harvests
harvests.get('/', (req, res) => {
    models.Harvest.findAll()
        .then((harvests) => {
            res.status(200);
            res.send(harvests);
        })
        .catch((errors) => {
            res.status(500);
            res.send(errors);
        });
});

// create a new harvest
harvests.post('/', (req, res) => {
   models.Harvest.create({
       name: 'New Harvest',
       startDate: new Date(),
       endDate: new Date()
   }).then((response) => {
       res.status(200);
       res.send('successfully created new harvest!');
   }).catch((errors) => {
       res.status(500);
       res.send(errors);
   });
});

// update harvest by id
harvests.post('/:id', (req, res) => {
    let harvestId = req.params.id;
    models.Harvest.findById(harvestId)
        .then((harvest) => {
            harvest.updateAttributes({
                name: req.body.name,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            });
            res.status(200);
            res.send('successfully updated harvest with id: ' + harvestId);
        })
        .catch((errors) => {
            res.status(500);
            res.send(errors);
        });
});

harvests.delete('/:id', (req, res) => {
    let harvestId = req.params.id;
    models.Harvest.findById(harvestId)
        .then((harvest) => {
            harvest.destroy();
            res.status(200);
            res.send('successfully removed harvest with id: ' + harvestId);
        })
        .catch((errors) => {
            res.status(500);
            res.send(errors);
        });
});

module.exports = harvests;