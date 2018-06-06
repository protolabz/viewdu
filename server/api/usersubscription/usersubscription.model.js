'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSubscriptionSchema = new Schema({
    user: {},
    subscription: {},
    date: Number,
    expiry: Number,
    paypal: {},
    paypalContract: {}
});

module.exports = mongoose.model('UserSubscription', UserSubscriptionSchema);