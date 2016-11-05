var rpc = require('node-json-rpc');

// Create a server object with options
var client = new rpc.Client({
  port: 6969,
  host: 'localhost',
  path: '/server',
  strict: false});

client.run = function(method, params) {
  client.call({'method': method, 'params': params},
    function(err, res) {
      console.log(err, res);
      var error = res.error;
      var result = res.result;
      if (error) {
        console.error('error:', error);
      } else {
        console.log('result:', 'scott', res.result);
      }
    }
  );
};

params1 = ['test']
console.log('params: ', params1);
client.run('cnt', params1)

params1 = ['test', ['test', 'test']]
console.log('params: ', params1);
client.run('set_address', params1)

params1 = []
console.log('params: ', params1);
client.run('get_businesses', params1)

params1 = [{test: 2}]
console.log('params: ', params1);
client.run('get_scores', params1)