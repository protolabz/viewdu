'use strict';

var Subscription = require('./subscription.model');
var config = require('../../config/environment');
var Guid = require('guid');
var perf = require('../../components/performance/performance');

module.exports = 
class SubscriptionController {

    constructor() {
    }

    index(req, res) {
        Subscription.find({}, function(err, subscriptions) {
            if (err) return perf.ProcessResponse(res).send(500, err);
            perf.ProcessResponse(res).send(200, subscriptions);
        });
    };

    /**
     * Creates a new subscription
     */
    create(req, res, next) {
        var newSubscription = new Subscription(req.body);
        newSubscription.date = Date.now();
        newSubscription.save(function(err, subscription) {
            if (err) return validationError(res, err);
            var data = {
                creation: true,
                data: subscription
            };
            perf.ProcessResponse(res).send(200, data);
        });
    };

    /**
     * Get a single subscription
     */
    show(req, res, next) {
        var subscriptionId = req.params.id;

        Subscription.findById(subscriptionId, function(err, subscription) {
            if (err) return next(err);
            if (!subscription) return perf.ProcessResponse(res).send(401);
            perf.ProcessResponse(res).send(subscription);
        });
    };

    /**
     * Deletes a subscription
     * restriction: 'admin'
     */
    destroy(req, res) {
        Subscription.findByIdAndRemove(req.params.id, function(err, subscription) {
            if (err) return perf.ProcessResponse(res).send(500, err);
            return perf.ProcessResponse(res).send(204);
        });
    };
}

