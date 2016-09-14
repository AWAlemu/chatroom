var express = require('express');
var socket_io = require('socket.io');
var http = require('http');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var messageThread = [];
var usersCounter = 0;
io.on('connection', function(socket) {
    usersCounter++;
    io.emit('numOfUsers', usersCounter);
    for (var i= 0; i< messageThread.length; i++) {
        socket.emit('message', messageThread[i]);
    }
    socket.on('message', function(message) {
        messageThread.push(message);
        socket.broadcast.emit('message', message);
    });
    
   socket.on('disconnect', function(socket) {
       usersCounter--;
       io.emit('numOfUsers', usersCounter);
    });
});

server.listen(process.env.PORT || 8080);