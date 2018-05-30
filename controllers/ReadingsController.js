"use strict";
const config = require("../config/config");
const env = process.env.NODE_ENV;
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

class ReadingsController {

	constructor(twilioWrapper) {
		this.twilioWrapper = twilioWrapper;
	}

	handleReading(reading, location, type) {
		if (this.ensureReadingDataIsNumeric(reading)) {
			if (env === "production") {
				this.sendDataToJimsDatabase(reading, location, type);
				if (reading < 5) {
					this.twilioWrapper.sendNotification(
						"The Dissolved Oxygen reading fell below 5ppm",
						config.twilio.recipient,
						config.twilio.sender);
				}
			}
			return this.saveReading(reading, location, type);
		}
	}

	ensureReadingDataIsNumeric(data) {
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
		return models.Readings.findAll();
	}

	getLastTenReadings() {
		return models.Readings.findAll({
			limit: 10,
			order: [["createdAt", "DESC"]]
		});
	}

	getLastReading() {
		return models.Readings.findAll({
			limit: 1,
			order: [["createdAt", "DESC"]]
		});
	}

	getReadingsBetweenDates(start, end) {
		return models.Readings.findAll({
			where: {
				createdAt: {
					[Op.between]: [start, end]
				}
			}
		});
	}

	mapSensorType(type) {
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
		return sensorType;
	}

	knectAndSend(reading, location, type) {
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

		knex
			.insert({
				heading: "DO",
				value: reading,
				datestamp: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
				location: location,
				post_type: type,
				grow_level: "Tank"
			})
			.into("monitoring");
	}

	sendDataToJimsDatabase(reading, location, type) {
		let loc = location.match(/\d+/g).map(Number) || location;
		let sensorType = this.mapSensorType(type);
		this.knectAndSend(reading, loc, sensorType);
	}
}

module.exports = ReadingsController;
