var socket = io.connect(); 

$("a.send").click(function(e){
	e.preventDefault();
	socket.emit('message', {msg:$('#message').val()});
});

socket.on('info', function (data) {
    console.log(data);
});

socket.on('message', function (data) {
    console.log(data);
    $("#list-messages").append($('<li>').text(data.msg));
});
