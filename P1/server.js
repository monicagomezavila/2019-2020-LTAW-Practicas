// SERVIDOR WEB TIENDA

//-- Acceso al módulo fs, para lectura de ficheros
const fs = require('fs');

//-- http server
const http = require('http');
const PUERTO = 8080

console.log("Arrancando servidor...")

server = http.createServer((req, res) => {
  console.log("---> Peticion recibida")
  console.log(req.headers.host)
  //console.log("Recurso solicitado (URL): " + req.url)

  pet1 = req.url
  pet1 = pet1.slice(1)

  fs.readFile(pet1, 'utf8', (err, data) => {
      if (err) {
        console.log()
        console.log("-------> ERROR!!")
        console.log(err.message)
        console.log()
      }
      else { //-- Lectura normal, cuando no hay errores
        console.log("---> Comienzo del fichero leido")
        console.log(data)
        console.log("---> Final del fichero")
      }
  });
})

server.listen(PUERTO);
