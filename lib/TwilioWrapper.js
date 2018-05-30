class TwilioWrapper {

	constructor() {
	}

	sendNotification(client, body, recipient, sender) {
		client.messages.create({body: body, to: recipient,from: sender})
			.then(message => console.log("Text message sent: id:" + message.sid))
			.catch(errors => console.log("Failed to send text: " + errors));
	}

}

module.exports = TwilioWrapper;
