/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
/*
User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test',
        state : {
        extendedDetailsRequired:true,
        validateViaEmailRequired:true
        }
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin',
        state : {
        extendedDetailsRequired:true,
        validateViaEmailRequired:true
        }
    }, function() {
        console.log('finished populating users');
    });
});*/

var ChartData = require('../api/chartdata/chartdata.model');

ChartData.findOne({code:'auth'}).then(function(err, data) {
    if (err) return;
    if (!data) {
        ChartData.create({
            code: 'auth',
            name: 'Authentication Data',
            description: 'A historical record of all the user logins from the system',
            data: []
        }, function() {
            console.log('finished populating chart data');
        });
    }
});