//
// set deployment overrides here
var overrides = {
    R8_MAX_CPU: 9999
};


var values = require('./heroku-env-viewdu');
for(var key in overrides) {
    values[key] = overrides[key];
}
var envStrings = [];
for(var key in values) {
    envStrings.push(key + '=' + values[key]);
}

var exec = require('child_process').exec;
exec('heroku config:set ' + envStrings.join(' '), console.log);