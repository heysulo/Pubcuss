#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('pubcuss:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */


var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

function logger(status,code) {
  //set default value
  if (code==undefined){
    code = 0;
  }

  //setup time
  var now = new Date();
  var content = "";
  now = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();


  //switch
  switch (code){
    case 0:
      content = now + " [INFO] " + status;
      break;
    case 1:
      content = now + " [WARN] " + status;
      break;
    case 2:
      content = now + " [CRIT] " + status;
      break;
    default:
      content = now + " [????] " + status;
      break;
  }

  //log to file
  fs.appendFile('log.txt', content+"\n", function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io').listen(server);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


io.on('connection', function(socket){
    console.log('connection initialized',socket.id,socket.request.connection.remoteAddress.replace(/^.*:/, ''));
    socket.on('disconnect', function () {
        console.log(socket.id,"disconnected");
    });

    
    // io.emit('user_connect','{"name": "'+ +'","uname": "heysulo"}');

});