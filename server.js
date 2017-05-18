var express = require('express');
var socket_io = require('socket.io');
var http = require('http');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

app.get('/threedcart', function(req, res) {
    console.log('/threedcart route called');
    return res.status(200).json({
          success: true,
          "PostBackURL" : "http://app.skulabs.com"
        });
});

app.post('/threedcart', function(req, res) {
    console.log('/threedcart route called');
    return res.status(200).json({
          success: true,
          "PostBackURL" : "http://app.skulabs.com"
        });
});

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