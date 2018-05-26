"use strict";
const config = require("../config/config");
const env = process.env.NODE_ENV;
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");
const twilio = require("./twilio");

class ReadingsController {
	constructor() {}

	handleReading(reading, location, type) {
		if (this.ensureReadingDataIsNumeric(reading)) {
			twilio.eventFilter(reading);
			if (env === "production") {
				this.sendDataToJimsDatabase(reading, location, type);
			}
			return this.saveReading(reading, location, type);
		}
	}

	ensureReadingDataIsNumeric() {
		const isDecimalOrFloat = /^[0-9]+([,.][0-9]+)?$/g;
		if (isDecimalOrFloat.test(data)) {
			return true;
		} else {
			throw new Error("reading contained data that was not numeric");
		}
	}

	saveReading(reading, location, type) {
		return models.Readings.create({
			reading: reading,
			location: location,
			type: type
		});
	}

	getAllReadings() {
		models.Readings.findAll();
	}

	getLastTenReadings() {
		models.Readings.findAll({
			limit: 10,
			order: [["createdAt", "DESC"]]
		});
	}

	getLastReading() {
		models.Readings.findAll({
			limit: 1,
			order: [["createdAt", "DESC"]]
		});
	}

	getReadingsBetweenDates(start, end) {
		models.Readings.findAll({
			where: {
				createdAt: {
					[Op.between]: [start, end]
				}
			}
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
			.into("monitoring");
	}
}

module.exports = ReadingsController;
