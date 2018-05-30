const config = require("../config/config");

class TwilioWrapper {

	constructor() {
	}

	sendNotification(client) {
		client.messages
			.create({
				body: "The Dissolved Oxygen reading fell below 5ppm",
				to: config.twilio.recipient,
				from: config.twilio.sender
			})
			.then(message => console.log("Text message sent: id:" + message.sid))
			.catch(errors => console.log("Failed to send text: " + errors));
	}

}

module.exports = TwilioWrapper;
