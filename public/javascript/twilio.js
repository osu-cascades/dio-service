const twilio = require('twilio');
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = new twilio(accountSid, authToken);

const twilioEvent = {
    eventFilter: (reading) => {
        if (reading <= 10) {
            client.messages.create({
                body: 'The Dissolved Oxygen reading fell below 10ppm',
                to: '+15414192095',
                from: '+15415267698'
            })
                .then((message) => console.log(message.sid))
                .catch((errors) => console.log(errors));
        }
    }
};

module.exports = twilioEvent;
