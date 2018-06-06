'use strict'
//require the Twilio module and create a REST client 

class SMSService {
    constructor(){
        this.client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTHTOKEN); 
    }

    sendSMS(number, message, callback) {
        this.client.messages.create({ 
                to: number, 
                from: process.env.TWILIO_NUMBER, 
                body: message, 
            }, callback);
    }

}

module.exports = SMSService;