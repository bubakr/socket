var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
});

socket.on('disconnect', function(){
    console.log('Connection lost to server');
});


socket.on('newMessage', function(data){
    console.log('New Message', data);
    var li = $('<li></li>');
    li.text(`${data.from} : ${data.text}`);
    $('#messages').append(li);
});



$('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function(){

    });
});
