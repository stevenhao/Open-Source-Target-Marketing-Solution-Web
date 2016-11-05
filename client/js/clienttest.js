var rpc = require('node-json-rpc');

// Create a server object with options
var client = new rpc.Client({
  port: 6969,
  host: 'localhost',
  path: '/server',
  strict: false});
params1 = ['test'];
console.log('params: ', params1);

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

client.run('cnt', params1)
