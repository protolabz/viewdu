'use strict'

var redis = require('redis');

function newClient() {
  var client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
  client.auth(process.env.REDIS_AUTH);
  return client;
}

var client = null;
exports.publish = function (topic, data) {
  if(!client) {
    client = newClient();
  }
  console.log('publishing', data);
  client.publish(topic, JSON.stringify(data))
}

exports.subscribe = function (topic, cb) {
  var subClient = newClient();
  subClient.subscribe(topic)
  subClient.on('message', function (channel, message) {
    cb(JSON.parse(message));
  })
}
