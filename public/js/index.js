var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
});

socket.on('disconnect', function(){
    console.log('Connection lost to server');
});


socket.on('newMessage', function(data){
    var fromatedtime = moment(data.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(`${data.from} ${fromatedtime}: ${data.text}`);
    $('#messages').append(li);
});

socket.on('shareLocationMessage', function(message){
    var fromatedtime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');

    var a = $(`<a target="_blank" href>My current location</a>`);
    a.attr('href', message.url);
    li.text(`${message.from} ${fromatedtime}: `);
    li.append(a);
    console.log(li);
    $('#messages').append(li);
});



$('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextBox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('');
        messageTextBox.focus();
    });

});

var locationBtn = $('#sendlocation');
locationBtn.on('click', function (){
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }

    locationBtn.attr('disabled', 'disabled');
    locationBtn.text('Fetching location ...');

    navigator.geolocation.getCurrentPosition( function(position){

        socket.emit('shareLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationBtn.removeAttr('disabled');
        locationBtn.text('Share Location');
    }, function(){
        alert('Unable to fetch location');
        locationBtn.removeAttr('disabled');
        locationBtn.text('Fetching location ...');
        locationBtn.text('Share Location');
    });
});
