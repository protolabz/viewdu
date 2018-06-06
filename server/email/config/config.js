'use strict';


/*
    Emailing configuration 
*/
var emailTransportSMPT = {
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
}

module.exports = {
    emailTransportConfig: emailTransportSMPT
}
