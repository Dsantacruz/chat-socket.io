var express = require('express');

var app = express();

var server = require('http').Server(app);

app.use(express.static('public'));

// le pasamos el servidor http
var io = require('socket.io')(server);

var messages = [{
    id : 1,
    text : "Hola soy un mensaje",
    author : "Diego Santa Cruz"
}];

app.get('/hello', function (req, res) {
    res.status(200).send("Hello mundo");
})

//
io.on('connection', function (socket) {
    console.log('alguien se ha conectado con socket');
    socket.emit('messages', messages);

    socket.on('new-message', function (data) {
        messages.push(data);
        
        io.sockets.emit('messages', messages);
    })
});

server.listen(8080, function () {
    console.log("Servidor corriendo en http://localhost:8080");
});