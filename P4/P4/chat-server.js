//-- Cargar las dependencias
//-- Modulo express
const express = require('express')

//-- Crear una nueva aplciacion web
const app = express()

//-- Crear un servidor. Los mensajes recibidos
//-- los gestiona la app
const http = require('http').Server(app);

//-- Biblioteca socket.io en el lado del servidor
const io = require('socket.io')(http);

//-- Puerto donde lanzar el servidor
const PORT = 8080

//-- Contador de usuarios
var contador_users = 0;

//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Página principal
app.get('/', (req, res) => {
  let path = __dirname + '/chat.html';
  res.sendFile(path);
  console.log("Acceso a " + path);
});

//-- Otra vista de prueba
app.get('/woala', (req, res) => {
  res.send('WOALA! Chuck Norris approved!! :-)');
  console.log("Acceso a /woala");
});

//-- El resto de peticiones se interpretan como
//-- ficheros estáticos
app.use('/', express.static(__dirname +'/'));

//------ COMUNICACION POR WEBSOCKETS
//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){

  //-- Usuario conectado. Imprimir el identificador de su socket
  console.log('--> Usuario conectado. Socket id: ' + socket.id);
  contador_users += 1;
  msg_contador = "Eres el usuario: " + contador_users;
  msg_users = "Hay un nuevo miembro en el CHAT"

  //-- Le damos la bienvenida a través del evento 'hello'
  //-- ESte evento lo hemos creado nosotros para nuestro chat
  socket.emit('hello', "Bienvenido al Chat");
  socket.emit('hello', msg_contador);
  //-- Envía un mensaje a todos los usuarios excecto al que lo envía
  socket.broadcast.emit('msg', msg_users);


  //-- Función de retrollamada de mensaje recibido del cliente
  socket.on('msg', (msg) => {
    console.log("Cliente: " + socket.id + ': ' + msg);
    io.emit('msg', msg);
  })


  //-- El usuario interactúa con el server
  socket.on('cmd', (msg) =>{
    console.log("cmd: " + socket.id + ': ' + msg);
    switch (msg) {
      case "/help":
        comandos = ["/help", "/list", "/hello", "/date"]
        io.to(socket.id).emit('cmd', comandos);
        break;
      case "/hello":
        socket.emit('cmd', "Bienvenido al Chat");
        break
      case "/date":
        var f = new Date();
        fecha = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
        socket.emit('cmd', fecha);
        break
      case "/list":
        socket.emit('cmd', contador_users);
        break
      default:
        socket.emit('cmd', "NO existe ese comando");
    }
  })


  //-- Usuario desconectado. Imprimir el identificador de su socket
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado. Socket id: ' + socket.id);
    contador_users -= 1;
  });
});
