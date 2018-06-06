'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
    DOMAIN: 'http://localhost:9000',
    SESSION_SECRET: 'testing_system',

    FACEBOOK_ID: '514771358727801',
    FACEBOOK_SECRET: 'f445b150bff1351407f21f7124b239f4',

    TWITTER_ID: 'app-id',
    TWITTER_SECRET: 'secret',

    GOOGLE_ID: '173613234383-iko08d1b9j4hvi0t7sudlc600dqit7qg.apps.googleusercontent.com',
    GOOGLE_SECRET: '43FPY-qbOk99N2asQKT0GO0X',

    // Control debug level for modules using visionmedia/debug
    DEBUG: '',

    NODE_ENV: 'production',
    MONGOLAB_URI: 'mongodb://usertest:usertest@ds019946.mlab.com:19946/andrewsofiatesting/seed',
    PORT: process.env.PORT || 9000,

    EMAIL_USER: 'viewdu@outlook.com',
    EMAIL_PASSWORD: 'v1ewdu-core',

    PAYPAL_MODE: "sandbox",
    PAYPAL_CLIENTID: "AaL_JtBYMtBBBhhl8NOnLAxnooNZNzXX1BN8VnhkXVpMyT8ezfOgleZMCN7Vir20T5c5hGhamCR2gtAN",
    PAYPAL_SECRET: "EHhjTXAdjOD6HnzR9y4VSjd3leiUarlbMY_qnE_GfOHHSpLBCPgU2mNoqT7Oqn5EO9UZm_6uEYkPUIsl",
    PAYPAL_HEADERS_CUSTOM :"header",

    TWILIO_SID: "AC49cc991577e0928129ae37f5cc9e4707",
    TWILIO_AUTHTOKEN:"f02a81ae6ab5a7d19d1ff70bc88c95f9",
    TWILIO_NUMBER:"+61437878806",
    
    REDIS_HOST: 'redis-17896.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
    REDIS_PORT: '17896',
    REDIS_AUTH: 't#as%gy^dfasef#',
    
    MAX_CPU: "4",

    PERFORMANCE_MONTITORING: 'true'
    
};