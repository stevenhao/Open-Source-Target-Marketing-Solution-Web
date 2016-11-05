var rpc = require('node-json-rpc');
var colors = require('colors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = new express();


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


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var py = (function() {
  var py = {};
  const spawn = require('child_process').spawn;
  const subp = spawn('py/endpoint.py');

  logger.blue ("yo")
  var cbks = {};
  var starttimes = {};
  var qid = 0;
  subp.stdout.on('data', (data) => {
    logger.blue ("yolo")

    data = data + '';
    data.split('\n').forEach(function(line) {
      logger.blue('py stdout:', line);
      if (line.length == 0) return;
      if (line.startsWith("DBG: ")) {
        logger.blue('py dbg:', line);
      } else if (line.startsWith("ERR: ")) {
        logger.red('py dbg:', line);
      } else {
        var response;
        try {
          response = JSON.parse(line);
        } catch (e) {
          logger.red('parse error:', line, e);
          return;
        }
        var qid = response.id;
        var millis = new Date().getTime() - starttimes[qid];
        var secs = millis / 1000;
        logger.white('response[' + qid + ']', JSON.stringify(response), ' took ', secs, ' seconds');
        cbks[qid](response.result);
      }
    });
  });

  py.call = function(name, params, cbk) {
    ++qid;
    logger.white('call[' + qid + ']', name);
    var query = {id: qid, name: name, params: params};
    logger.white('args:', JSON.stringify(query));
    subp.stdin.write(JSON.stringify(query) + '\n');
    cbks[qid] = cbk;
    starttimes[qid] = new Date().getTime();
  };

  return py;
})();



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
  var result = 'is not a ho';
  //RESULT(result);
  ERROR("chill");
}

server.cnt = function(params, ERROR, RESULT) {
  logger.white('query', JSON.stringify(params));

  var str = params[0];
  var query = {str: str};
  py.call('cnt', query, function (result) {
    RESULT(result);
  });
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
