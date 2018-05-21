const config = require("../config/config");
const express = require("express");
const models = require("../models");
const api = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const harvests = require("./harvest-routes");
const moment = require("moment");
const env = process.env.NODE_ENV;

const twilioEvent = require("../public/javascript/twilio");

// save new reading to the database
api.post("/do/readings", (req, res) => {
	if (ensureReadingDataIsNumeric(req.body.reading)) {
		const reading = req.body.reading;
		const location = req.body.location;
		const type = req.body.type;
		twilioEvent.eventFilter(reading);

		console.log("reading: " + reading);
		console.log("location: " + location);
		console.log("type: " + type);

		models.Readings.create({
			reading: reading,
			location: location,
			type: type
		})
			.then(() => {
				res.status(200);
				res.send(`Success`);
			})
			.catch(err => {
				res.status(500);
				res.send(err);
			});
		if (env === "production") {
			sendDataToJimsDatabase(reading, location, type);
		}
	} else {
		res.status(500);
		res.send("reading contained data that was not numeric");
	}
});

// get all readings
api.get("/do/readings", (req, res) => {
	models.Readings.findAll()
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
api.get("/do/readings/recent", (req, res) => {
	models.Readings.findAll({
		limit: 10,
		order: [["createdAt", "DESC"]]
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
api.get("/do/readings/last", (req, res) => {
	models.Readings.findAll({
		limit: 1,
		order: [["createdAt", "DESC"]]
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
api.get("/do/readings/query", (req, res) => {
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
		});
});

api.use("/harvests", harvests);

module.exports = api;

let sendDataToJimsDatabase = (reading, location, type) => {
	let loc = location.match(/\d+/g).map(Number);
	let sensorType = "";

	switch (type) {
		case "0":
			sensorType = "DO";
			break;
		case "1":
			sensorType = "PH";
			break;
		case "2":
			sensorType = "EC";
			break;
		default:
			sensorType = "NA";
	}

	let knex = require("knex")({
		client: "mysql2",
		connection: {
			host: config.jim.host,
			user: config.jim.user,
			password: config.jim.pass,
			database: config.jim.db,
			port: config.jim.port
		}
	});

	console.log(`reading: ${reading}, location: ${location}, type: ${sensorType}, loc: ${loc}`);

	knex
		.insert({
			heading: "DO",
			value: reading,
			datestamp: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
			location: loc,
			post_type: "DO",
			grow_level: "Tank"
		})
		.into("monitoring")
		.then(response => {
			console.log(response);
		})
		.catch(errors => {
			console.log(errors);
		});
};

let ensureReadingDataIsNumeric = data => {
	const isDecimalOrFloat = /^[0-9]+([,.][0-9]+)?$/g;
	return isDecimalOrFloat.test(data);
};
