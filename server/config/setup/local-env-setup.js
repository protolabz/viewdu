function configSetup() {
    console.log('----------- using default enviroment');
    var defaults = require('./local-env-default');
    for(var key in defaults) {
            process.env[key] = defaults[key];
            console.log('env: ', key, defaults[key]);
    }
}

module.exports = configSetup;