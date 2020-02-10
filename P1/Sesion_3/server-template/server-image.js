const http = require('http');
const url = require('url'); //para parsear
const fs = require('fs');
const PUERTO = 8080

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  let q = url.parse(req.url, true); //para ver el re
  console.log("Recurso:" + q.pathname)


  let filename = ""
  let mime = ""

  //-- Obtener fichero a devolver
  if (q.pathname == "/"){
    filename += "index.html"
    mime = "text/html"
  }else if (q.pathname == "/css/micss.css") {
    filename += "micss.css"
    mime += "text/css"
  }else if (q.pathname == "/logo_node.png") {
    filename += "logo_node.png"
    mime += "text/png"
  }else if (q.pathname == "/test1.html"){
    filename += "test1.html"
    mime += "text/html"
  }else if(q.pathname == "/logo-urjc.png"){
    filename += "logo-urjc.png"
    mime += "text/png"
  }else if (q.pathname == "/index.html"){
    filename += "index.html"
    mime = "text/html"
  }


  //-- Leer fichero
  fs.readFile(filename, function(err, data) {

    //-- Fichero no encontrado. Devolver mensaje de error
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }


    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();
  });

}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
