
function App(){

  this.init = function(data){
    console.log(data);
  }

  this.send = function(msg){    
    socket.emit('message', {msg:msg});
  }

  this.recive = function(data) {    
      $("#list-messages").append($('<li>').text(data.msg));
  }

};

var socket = io.connect(); 
var app = new App();

socket.on('connected', app.init);
socket.on('message', app.recive);

$("a.send").click(function(e){
  e.preventDefault();
  app.send($('#message').val());
});

