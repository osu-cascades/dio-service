const twilio = require("twilio");
const config = require("../config/config");

const client = new twilio(config.twilio.accountSid, config.twilio.authToken);

const twilioEvent = {
	eventFilter(reading) {
		if (reading < 5) {
			this.sendNotification();
		}
	},

	sendNotification() {
		client.messages
			.create({
				body: "The Dissolved Oxygen reading fell below 5ppm",
				to: config.twilio.recipient,
				from: config.twilio.sender
			})
			.then(message => console.log("Text message sent: id:" + message.sid))
			.catch(errors => console.log("Failed to send text: " + errors));
	}
};

module.exports = twilioEvent;
