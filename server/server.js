const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('new user connected');

    socket.emit('newEmail', {
        from: 'email@domain.com',
        text: 'Hey, what is going on?',
        created: 123
    });

    socket.on('createMessage', (message)=>{
        console.log('Message created', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            created: new Date().getTime()
        });
    });


    socket.on('disconnect', ()=>{
        console.log('Disconncted');
    });


    socket.on('createEmail', (data)=>{
        console.log('Create Email', data);
    });



});

app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
})
