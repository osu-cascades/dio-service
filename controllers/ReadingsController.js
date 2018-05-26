"use strict";

const models = require("../models");
const Sequelize = require("sequelize");

class ReadingsController {
	ensureReadingDataIsNumeric() {
		const isDecimalOrFloat = /^[0-9]+([,.][0-9]+)?$/g;
		return isDecimalOrFloat.test(data);
	}

	saveReading(reading, location, type) {
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
	}

	getAllReadings() {
		models.Readings.findAll()
			.then(readings => {
				res.status(200);
				res.send(readings);
			})
			.catch(err => {
				res.status(500);
				res.send(err);
			});
	}

	getLastTenReadings() {
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
	}

	getLastReading() {
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
	}

	getReadingsBetweenDates(start, end) {
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
	}

	sendDataToJimsDatabase(reading, location, type) {
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
	}
}

module.exports = ReadingsController;
