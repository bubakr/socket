var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
});

socket.on('disconnect', function(){
    console.log('Connection lost to server');
});


socket.on('newMessage', function(data){
    console.log('New Message', data);
});
