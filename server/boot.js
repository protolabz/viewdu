var cluster = require('cluster')
var numCpus = process.env.WEB_CONCURRENCY || require('os').cpus().length;
if(process.env.MAX_CPU) {
    var numCpus = Math.min(process.env.R8_MAX_CPU, numCpus);
}

console.log('starting ' + numCpus + ' instances');

cluster.setupMaster({exec: __dirname + '/app.js'})
for (var i = 0; i < numCpus; i++) {
    cluster.fork();
}