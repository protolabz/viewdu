'use strict';

var UserSubscription = require('./usersubscription.model');
var config = require('../../config/environment');
var Guid = require('guid');
var perf = require('../../components/performance/performance');

module.exports = 
class UserSubscriptionController {

    constructor() {
    }

    index(req, res) {
        UserSubscription.find({}, function(err, usersubscriptions) {
            if (err) return res.send(500, err);
            res.json(200, usersubscriptions);
        });
    };

    /**
     * Creates a new usersubscription
     */
    create(req, res, next) {
        var newUserSubscription = new UserSubscription(req.body);
        newUserSubscription.date = Date.now();
        newUserSubscription.save(function(err, usersubscription) {
            if (err) return validationError(res, err);
            var data = {
                creation: true,
                data: usersubscription
            };
            res.json(200, data);
        });
    };

    /**
     * Get a single usersubscription
     */
    show(req, res, next) {
        var usersubscriptionId = req.params.id;

        UserSubscription.findById(usersubscriptionId, function(err, usersubscription) {
            if (err) return next(err);
            if (!usersubscription) return res.send(401);
            res.json(usersubscription);
        });
    };

    /**
     * Deletes a usersubscription
     * restriction: 'admin'
     */
    destroy(req, res) {
        UserSubscription.findByIdAndRemove(req.params.id, function(err, usersubscription) {
            if (err) return res.send(500, err);
            return res.send(204);
        });
    };
}

