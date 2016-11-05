var rpc = require('node-json-rpc');
var colors = require('colors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = new express();


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var logger = (function() {
  var logger = {};
  logger.red = function() {
    console.log(Array.from(arguments).join(' ').red);
  };
  logger.blue = function() {
    console.log(Array.from(arguments).join(' ').blue);
  };
  logger.white = function() {
    console.log(Array.from(arguments).join(' ').white);
  };
  return logger;
})();

var server = {};
server.scott = function(params, ERROR, RESULT) {
  logger.white('query', JSON.stringify(params));
  var error = undefined;
  var result = 'is a ho';
  //RESULT(result);
  ERROR("fuck");
}

app.post('/server', function(req, res) {
  var Qname = req.body.method;
  var error = function(msg) {
    var obj = {"result": null, "error": msg, "id": req.body.id};
    res.send(obj);
  };
  var result = function(msg) {
    var obj = {"result": msg, "error": null, "id": req.body.id};
    res.send(obj);
  };
  if (server[req.body.method]) {
    server[req.body.method](req.body.params, error, result);
  } else {
    logger.red('METHOD NOT FOUND!', req.body.mothd);
  }
});

PORT = 6969;
console.log('listening on ', PORT);
app.listen(PORT);
