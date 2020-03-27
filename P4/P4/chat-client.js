console.log("Ejecutando cliente JS...");

//-- Obtener los elementos del DOM
const display = document.getElementById("display");
const msg = document.getElementById("msg");
const send = document.getElementById("send");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

//-- Se ha recibido el evento 'hello':
//-- Es el mensaje de bienvenida del servidor
socket.on('hello', (msg) => {

  //-- Mostrarlo en la consola del navegador, para
  //-- depurar
  console.log("Mensaje del servidor: " + msg);

  //-- Ponerlo en el párrafo display
  display.innerHTML = msg;
});

//-- Se ha recibido un mensaje
socket.on('msg', (msg) => {
  //-- Añadirlo al párrafo display
  display.innerHTML += "<br> > " + msg;
});

//-- Mensaje del server sólo para ese user
socket.on('cmd', (msg) => {
  //-- Añadirlo al párrafo display
  display.innerHTML += "<br> > " + msg;
});

//-- Botón de envío apretado
send.onclick = () => {

  //-- Se envía el mensaje escrito
  //-- Usamos el nombre 'msg' para los mensajes de usuario
  //-- Si no se ha introducido ningún mensaje, no se envía
  if (msg.value){
    primer_char = msg.value.slice(0,1);
    if (primer_char != "/"){
      socket.emit('msg', msg.value)
    }else{
      socket.emit('cmd', msg.value)
    }
  }
  //-- Borramos el mensaje escrito
  msg.value="";
}
