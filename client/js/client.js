var rpc = require('node-json-rpc');

// Create a server object with options
var client = new rpc.Client({
  port: 6969,
  host: 'localhost',
  path: '/server',
  strict: false});

client.run = function(method, params, cbk) {
  client.call({'method': method, 'params': params}, cbk);
}

module.exports = client;
