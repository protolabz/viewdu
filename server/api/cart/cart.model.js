'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    userid: String,
    date: Number,
    cartItems: []
});

module.exports = mongoose.model('Cart', CartSchema);