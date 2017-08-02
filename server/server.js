const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var {generateMessage} = require('./utils/message');

io.on('connection', (socket)=>{
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));

    socket.on('createMessage', (message, callback)=>{
        console.log('Message created', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            created: new Date().getTime()
        });
        callback('This is from the server');

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     created: new Date().getTime()
        // });
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
