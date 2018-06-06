'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChartDataSchema = new Schema({
        code: {
            type: String,
            lowercase: true
            },
        name: String,
        description: String,
        data: []
});


module.exports = mongoose.model('ChartData', ChartDataSchema);