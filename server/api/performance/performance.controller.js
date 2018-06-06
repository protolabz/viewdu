'use strict';

var Performance = null;
var config = require('../../config/environment');
var Guid = require('guid');
var perf = require('../../components/performance/performance');

module.exports = 
class PerformanceController {

    constructor(app) {
        this.app = app;
        Performance = require('./performance.model')(this.app);
    }

    index(req, res) {
        Performance.find({}, function(err, performances) {
            if (err) return perf.ProcessResponse(res).status(500).json(err);
            if (!performances) return perf.ProcessResponse(res).status(400).json([]);
            perf.ProcessResponse(res).status(200).json(performances);
        });
    };

    /**
     * Creates a new performance
     */
    create(req, res, next) {
        
        var newPerformance = new Performance();
        var user = req.user;

        if (user)
            newPerformance.userid = user._id;

        newPerformance.ipaddress = req.headers['x-forwarded-for'] || 
                                        req.connection.remoteAddress || 
                                        req.socket.remoteAddress ||
                                        req.connection.socket.remoteAddress;
        newPerformance.clientToServer = req.body.clientToServer;
        newPerformance.serverProcessing = req.body.serverProcessing;
        newPerformance.serverToClient = req.body.serverToClient;
        newPerformance.callCount = req.body.callCount;
        newPerformance.date = Date.now();

        console.log("Saving Performance", newPerformance);

        newPerformance.save(function(err, performance) {
            if (err) return validationError(res, err);
            var data = {
                creation: true,
                data: performance
            };
           perf.ProcessResponse(res).status(200).json(data);
        });
    };

    /**
     * Get a single performance
     */
    show(req, res, next) {
        var performanceId = req.params.id;
        var user = req.user;
        Performance.findOne({userid: user._id, _id:performanceId}, function(err, performance) {
            if (err) return next(err);
            if (!performance) return perf.ProcessResponse(res).send(401);
            perf.ProcessResponse(res).status(200).json(performance);
        });
    };

    /**
     * Deletes a performance
     * restriction: 'admin'
     */
    destroy(req, res) {
        var user = req.user;
        Performance.remove({userid: user._id, _id:req.params.id}, function(err, performance) {
            if (err) return perf.ProcessResponse(res).send(500, err);
            return perf.ProcessResponse(res).send(204);
        });
    };
}

