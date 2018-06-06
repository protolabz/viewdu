'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var subscriptionTypes = ['single', 'subscription'];
var frequencyUnits = ['days', 'weeks', 'months', 'years'];

var CostingSchema = new Schema({
    price: Number,
    currency: String,
    recurring: Boolean,
    frequency: Number,
    frequencyUnits:  {
        type: String,
        default: 'months'
    }
});

var SubscriptionSchema = new Schema({
    name: String,
    type: {
        type: String,
        default: 'subscription'
    },
    date: Number,
    code: String,
    description: String,
    costing: CostingSchema
});



module.exports = mongoose.model('Subscription', SubscriptionSchema);