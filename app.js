var express = require('express')
var routes = require('./routes')
var path = require('path');
var bodyParser = require('body-parser');

var app = express()

app.set('view engine', 'jade')
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



var server = app.listen(app.get('port'));
var io = require('socket.io').listen(server);


// Routers
app.get("/", function (req, res) {
	res.render('index', {'title':'Simple chat'} );
});


io.sockets.on('connection', function (socket) {
    
    console.log('Nuevo cliente conectado');        
    socket.emit('connected', {msg:'Bienvenido.'});
    
	socket.on('message', function(data){			
		io.emit('message', data);
	});
	
});


console.log('Express server listening on port ' + app.get('port'));
