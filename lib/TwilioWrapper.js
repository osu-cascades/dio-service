class TwilioWrapper {

	constructor(client) {
		this.client = client;
	}

	sendNotification(body, recipient, sender) {
		this.client.messages.create({body: body, to: recipient,from: sender})
			.then(message => console.log("Text message sent: id:" + message.sid))
			.catch(errors => console.log("Failed to send text: " + errors));
	}

}

module.exports = TwilioWrapper;
