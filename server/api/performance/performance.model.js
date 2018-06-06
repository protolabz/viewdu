'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Resource = require('odata-resource');
var app = require('express')();

module.exports = function(app) {
    var PerformanceSchema = new Schema({
        userid: String,
        ipaddress: String,
        clientToServer: Number,
        serverProcessing: Number,
        serverToClient: Number,
        callCount: Number,
        date: Number
    });

    var model = mongoose.model('Performance', PerformanceSchema);

    // define the REST resource
    var bookResource = new Resource({
        rel: '/odata/performance',
        model: model
    });

    console.log('*** setting odata', app);

    // setup the routes
    bookResource.initRouter(app);

    return model;
}