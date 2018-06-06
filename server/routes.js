/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var express = require('express');
var path = require('path');
var auth = require('./auth/auth.service');

module.exports = function(app) {

    // Insert routes below
    app.use('/api/users', require('./api/user'));
    app.use('/api/subscriptions', require('./api/subscriptions'));
    app.use('/api/usersubscriptions', require('./api/usersubscription'));
    app.use('/api/chartdata', require('./api/chartdata'));
    app.use('/api/performance', require('./api/performance')(app));
    app.use('/gateway/paypal', require('./api/paypal'));
    app.use('/api/cart', require('./api/cart'));
    app.use('/auth', require('./auth'));
    
    //user profile image path
    //app.use(express.bodyParser({uploadDir:'/profileimages'}));

    // All undefined asset or api routes should return a 404
    /*app.route('/:url(odata|api|auth|gateway|components|bower_components|assets)/*')
        .get(auth.isAuthenticated(), errors[404]);*/

    // All other routes should redirect to the index.html
    var publicPath = path.resolve(__dirname, 'views/coreapp');
    app.use(express.static(publicPath));
    var appPath = path.resolve(__dirname, 'views/client');
    app.use(express.static(appPath));

    //App Route
    /*app.route('/app').get(auth.isAuthenticated(), 
    
        function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
                res.redirect('/#!/login');
            }
            next();
        }, 
        function(req, res) {
            console.log("sending data");
            res.sendFile('app.html', {root: appPath});
        });*/

    //Default route    
    app.route('/').get(function(req, res) {
            console.log("sending data");
            res.sendFile('index.html', {root: publicPath});
        });

    
};