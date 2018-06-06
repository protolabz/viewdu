/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('Executing Process Environment', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    require('./config/setup/local-env-setup')();
}

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var redisService = require('./components/redis/redisservice');
var moduleLoaderClass = require('./components/moduleloader/moduleloader');
var routerProvider = new (require('./components/routefactory/routefactory'))();
var performanceProvider = require('./components/performance/performance');
var path = require('path');

redisService.subscribe('t', function (post) {
    console.log('Broadcast Redis Transaction',post);
    //websockets.broadcast('t', post);
  });
redisService.subscribe('ex', function (post) {
    console.log('Broadcast Redis Export',post);
    //websockets.broadcast('ex', post);
  });

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if (config.seedDB) {
    require('./config/seed');
}

// Setup server
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var socketio = require('socket.io')(server, {
    serveClient: (config.env === 'production') ? false : true,
    path: '/socket.io-client'
});

//set upload size
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

//Load Remote Modules
var processPackage = {
    app: app,
    express: express,
    routerProvider: routerProvider,
    performanceProvider: performanceProvider
};

var moduleLoader = new moduleLoaderClass(processPackage, path.resolve(path.join(__dirname ,'../_server_modules')));
moduleLoader.Load();

// Start server
server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;