const twilio = require("twilio");
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = new twilio(accountSid, authToken);

const twilioEvent = {
	eventFilter(reading) {
		if (reading < 5) {
			this.sendNotification();
		}
	},

	sendNotification() {
		client.messages
			.create({
				body: "The Dissolved Oxygen reading fell below 10ppm",
				to: process.env.recipient,
				from: process.env.sender
			})
			.then(message => console.log("Text message sent: id:" + message.sid))
			.catch(errors => console.log("Failed to send text: " + errors));
	}
};

module.exports = twilioEvent;
