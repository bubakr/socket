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

socket.on('shareLocationMessage', function(message){
    console.log(message);
    var li = $('<li></li>');
    var a = $(`<a target="_blank" href>My current location</a>`);
    a.attr('href', message.url);
    li.text(`${message.from} `);
    li.append(a);
    console.log(li);
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

var locationBtn = $('#sendlocation');
locationBtn.on('click', function (){
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition( function(position){
        socket.emit('shareLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        alert('Unable to fetch location');
    });
});
