const express = require('express');
const models = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');

// get all harvests
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
    models.Harvest.create({
        name: 'New Harvest',
        startDate: new Date(),
        endDate: new Date()
    })
        .then((response) => {
            res.status(200);
            res.send(response);
        })
        .catch((errors) => {
            res.status(500);
            res.send(errors);
        });
});

// get harvest by id
router.get('/:id', (req,res) => {
    let harvestId = req.params.id;
    console.log("id: " + harvestId);
    models.Harvest.findById(harvestId)
        .then((harvest) => {
            res.status(200);
            res.send(harvest);
        })
        .catch((errors) => {
            res.status(500);
            res.send(errors);
        });
});

// update harvest by id
router.post('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    let harvestId = req.params.id;
    models.Harvest.findById(harvestId)
        .then((harvest) => {
            harvest.destroy().then(response => console.log(response)).catch(errors => res.send(errors));
            res.status(200);
            res.send(harvest);
        })
        .catch((errors) => {
            res.status(500);
            res.send(errors);
        });
});

module.exports = router;
