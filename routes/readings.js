const express = require("express");
const router = express.Router();
const config = require("../config/config");
const twilio = require("twilio")
const ReadingsController = require("../controllers/ReadingsController");

const TwilioWrapper = require("../lib/TwilioWrapper");

const client = {} //new twilio(config.twilio.accountSid, config.twilio.authToken);
const twilioWrapper = new TwilioWrapper(client);
const controller = new ReadingsController(twilioWrapper);

// save new reading to the database
router.post("/do/readings", (req, res) => {
	const reading = req.body.reading;
	const location = req.body.location;
	const type = req.body.type;

	controller
		.handleReading(reading, location, type)
		.then(() => {
			res.status(200);
			res.send(`Success`);
		})
		.catch(err => {
			res.status(500);
			res.send(err);
		});
});

// get all readings
router.get("/do/readings", (req, res) => {
	controller
		.getAllReadings()
		.then(readings => {
			res.status(200);
			res.send(readings);
		})
		.catch(err => {
			res.status(500);
			res.send(err);
		});
});

// get last 10 readings
router.get("/do/readings/recent", (req, res) => {
	controller
		.getLastTenReadings()
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
router.get("/do/readings/last", (req, res) => {
	controller
		.getLastReading()
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
router.get("/do/readings/query", (req, res) => {
	const start = req.query.start;
	const end = req.query.end;
	controller
		.getReadingsBetweenDates(start, end)
		.then(readings => {
			res.status(200);
			res.send(readings);
		})
		.catch(errors => {
			res.status(400);
			res.send(errors);
		});
});

module.exports = router;
