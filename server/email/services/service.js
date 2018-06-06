'use strict';
var nodemailer = require('nodemailer2');
var templates = require('../templates/templates');
var config = require('../config/config');

/*  
    This service is specifically designed for the sending of emails and 
    providing the services to allow for email exports.
*/

//Configure transporter
console.log('email config', config)
let transporter = nodemailer.createTransport(config.emailTransportConfig);

//Verify the connection
transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
        service.isConnectionVerified = false;
   } else {
        console.log('Server is ready to take our messages');
        service.isConnectionVerified = true;
   }
});

/*
    Default basic emailing system
*/
function SendMail_NoAttachment(from, to, cc, subject, message, callback) {
    if (service.isConnectionVerified){
        transporter.sendMail({
            from: from,
            to:to,
            cc:cc,
            subject: subject,
            html:message
        }, callback)
    }
}

/*
    Attachments must be defined like below
    attachments: [
        {   // utf-8 string as an attachment
            filename: 'text1.txt',
            content: 'hello world!'
        },
        {   // binary buffer as an attachment
            filename: 'text2.txt',
            content: new Buffer('hello world!','utf-8')
        },
        {   // file on disk as an attachment
            filename: 'text3.txt',
            path: '/path/to/file.txt' // stream this file
        },
        {   // filename and content type is derived from path
            path: '/path/to/file.txt'
        },
        {   // stream as an attachment
            filename: 'text4.txt',
            content: fs.createReadStream('file.txt')
        },
        {   // define custom content type for the attachment
            filename: 'text.bin',
            content: 'hello world!',
            contentType: 'text/plain'
        },
        {   // use URL as an attachment
            filename: 'license.txt',
            path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
        },
        {   // encoded string as an attachment
            filename: 'text1.txt',
            content: 'aGVsbG8gd29ybGQh',
            encoding: 'base64'
        },
        {   // data uri as an attachment
            path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
        }
    ]
*/
function SendMail_Attachment(from, to, cc, subject, message, attachments, callback) {
    if (service.isConnectionVerified){

        transporter.sendMail({
            from: from,
            to:to,
            cc:cc,
            subject: subject,
            html:message,
            attachments: attachments
        }, callback)
    }
}

/*
    Call the data template with parameters
*/
function SendMail_Template(template, from, to, contentData, callback) {
    if (service.isConnectionVerified){
        var templatetoUse = templates[template];
        var sendTemplate = transporter.templateSender(templates[template], {from: from});
        sendTemplate({to:to}, contentData, callback)
    }
}

var service = {
    isConnectonVerified: false,
    SendMailTextNoAttachment: SendMail_NoAttachment,
    SendMailWithAttachments: SendMail_Attachment,
    SendMailTemplate: SendMail_Template,
};


module.exports = service;
