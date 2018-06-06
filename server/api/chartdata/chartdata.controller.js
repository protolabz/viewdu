'use strict';

var ChartData = require('./chartdata.model');
var User = require('../user/user.model');
var Guid = require('guid');
var perf = require('../../components/performance/performance');

module.exports = 
class ChartDataController {

        constructor() {
        }

        /**
         * Exports the data for a specific code
         */
        retreive(req, res) {
            var code = req.params.code;
            console.log('Retreiving data code', code);
            ChartData.findOne({code:code}, function(err, data) {
                if (err) return res.json({err:err});
                if (!data) return res.json({err:'no data found'});
                res.json(data);
            });
        };

        getUsersCreationDates(req, res) {
            console.log('Retreiving data of user creations');
            User.find({}, function(err, users) {
                if (err) return res.send(500, err);

                //Process Chart Data
                var chartData = [];
                users.forEach(function(element) {
                        //Cast the date
                        var d = new Date(element.date);
                        d.setHours(0,0,0,0);
                        
                        //Check if we have a date in collection
                        if (chartData.filter(e => e.index == d.getTime()).length > 0) {
                        chartData.filter(e => e.index == d.getTime())[0].value++;
                        } else {
                        chartData.push({index: d.getTime(), value: 1});
                        }
                }, this);

                console.log('Retreiving data of user creations', chartData);
                //Return data to user
                res.json(200, chartData);
            });
        };

        addRecordFromClient(req, res) {
            var info = req.body;
            console.log('client save data', info);
            var result = addDataRecord(info.code, info.data);
            if (result.err) res.json(result.err);
            res.json(result.result);
        };

        addDataRecord(code, data) {
            ChartData.findOne({code:code}, function(err, chartdata) {
                if (err) return {err: err};
                if (!chartdata) return {err: 'no record found'};
                
                //update user
                chartdata.data.push(data);
                ChartData.findByIdAndUpdate(chartdata._id, chartdata, function(err, saved) {
                    if (err) return {err:'failed to update'};
                    return {result:'saved'};
                });
            });
        };
    }
