const dotenv = require("dotenv").config();
const env = process.env.NODE_ENV || "development";

const development = {
	// needed for migrations
	username: process.env.DEV_USER,
	password: process.env.DEV_PASS,
	database: process.env.DEV_DB,
	host: process.env.DEV_HOST,
	dialect: process.env.DEV_DIALECT,
	connectionUrl: process.env.DEV_CONN
};

const production = {
	// needed for migrations
	username: process.env.PROD_USER,
	password: process.env.PROD_PASS,
	database: process.env.PROD_DB,
	host: process.env.PROD_HOST,
	dialect: process.env.PROD_DIALECT,
	connectionUrl: process.env.PROD_CONN,
	twilio: {
		accountSid: process.env.accountSid,
		authToken: process.env.authToken,
		sender: process.env.sender,
		recipient: process.env.recipient
	},
	jim: {
		host: process.env.jimDBHost,
		user: process.env.jimDBUser,
		pass: process.env.jimDBPass,
		db: process.env.jimDB,
		port: process.env.jimDBPort
	}
};

const test = {
	username: process.env.DEV_USER,
	password: process.env.DEV_PASS,
	database: process.env.DEV_DB,
	host: process.env.DEV_HOST,
	dialect: "mysql"
};

const config = {
	development,
	production,
	test
};

module.exports = config[env];
