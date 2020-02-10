const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080

//-- Configurar el servidor
http.createServer( (req, res) => {//RES ES EL MENSAJE DE RESPUESTA QUE HAY QUE RELLENAR
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
  let q = url.parse(req.url, true);
  console.log("URL parseada: ")
  console.log("Host: " + q.host)
  console.log("pathname:" + q.pathname)

  //_- Crear el mensaje de respuesta. Primero la cabecera
  //-- El código 200 se usa para indicar que todo está ok
  //-- En el campo Content-Type tenemos que introducir el tipo MIME
  //-- de lo que devolvemos
  let mime = "text/html" //html
  //let mime = "text/plain" //TEXTO PLANO
  res.writeHead(200, {'Content-Type': mime}); //SOLO CON UNA CABECERA, CONSTENT.TYPE

  //-- Ahora escribimos el cuerpo: los datos a enviar, en html
  //-- En este ejemplo se envia directamente el HTML
  let msg = `
   <!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Mi tienda</title>
    </head>
    <body>
      <p> ¡BIENVENIDO A MI TIENDA! </p>
    </body>
  </html>
  `
  //-- Meter el mensaje en la respuesta
  res.write(msg);

  //-- Ahora terminamos la respuesta, invocando el método end
  res.end(); //TERMINAS MENSAJE Y ENVIAS

  //FAVICO ES EL ICONITO QUE Sale arriba en la PESTAÑA
  //curl localhost:8080 -I (cabeceras, http protocolo mensaje, ....)
}).listen(PUERTO);
console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
