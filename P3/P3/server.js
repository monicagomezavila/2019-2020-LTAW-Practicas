const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080

//-- Configurar y lanzar el servidor

http.createServer((req, res) => {
  let q = url.parse(req.url, true);
  var cookie = req.headers.cookie;
  //console.log("----------> Peticion recibida")
  //console.log("Petición:" + q.pathname)
  //console.log("Cookie: " + cookie)

  //-- Variables
  let filename = ""; //-- Recurso
  let mime = ""; //-- Tipo de recurso


  //-- Se accede a la pagina
  if (q.pathname == "/"){
    mime = "text/html"

    if (!cookie) {
      filename += "registro.html";

    //-- Hay definida una Cookie.
    } else {
       filename += "index.html";
     }

   }else if (q.pathname == ('/index.html')) {
     //-- Si han pulsado el enlace del sistema de registro
     if (!cookie) {
      res.setHeader('Set-Cookie', 'user=MON')
      }

      mime = "text/html"
      q.pathname = "/index.html"
      filename = "." + q.pathname

    }else{
      //-- Si encuentra más de una "/" esta en otra carpeta
      let cant = 0; //-- Variable que guarda la cantidad de "/" encontradas

      for(var i = 0; i < q.pathname.length; i++) {
    	 if (q.pathname[i] == "/")
            cant = cant+1;
       }

       //-- Dependiendo del valor de cant se decido el path que tiene el recurso
       if (cant>1){
          filename = "." + q.pathname
      }else{
          filename = q.pathname.slice(1)
      }
      //-- Para saber el tipo mime del recurso, se mira la parte final del mismo
      num = q.pathname.lastIndexOf(".");
      mime = q.pathname.slice(num+1)
      mime = "text/" + mime
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
