//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Modulos
const http = require('http');
const url = require('url');
const fs = require('fs')


//-- Funcion para atender a una peticion
function peticion(req, res) {

  //-- Mostrar en la consola el recurso al que se accede
  const q = url.parse(req.url, true);
  console.log("Petición: " + q.pathname)

  //-- Leer cookies
  const cookie = req.headers.cookie;
  console.log("Cookie: " + cookie)

  var filename = ""
  var mime = ""


  switch (q.pathname) {

    //-- Pagina principal
    case "/":
    //-- GENERO UN HTML SEGUN LA CONDICION DE LAS COOKIES
      content = fs.readFileSync("index.html", "utf-8")
      mime = "text/html"
      //-- No hay ninguna cookie
      if (!cookie) {
        content += "<div id = 'registro'><a href=/login><h2> SISTEMA DE REGISTRO</h2></a></div></div></body></html>"

      //-- Hay definida una Cookie
      } else {
        equal_num = cookie.lastIndexOf("=");
        user_cookie = cookie.slice(equal_num+1)
        content += "<div id = 'registrado'><p> Bienvenido a mi tienda " + user_cookie + "</hp></div></div></body></html>"
      }

      res.writeHead(200, {'Content-Type': mime});
      res.write(content);
      res.end();

      break;

    case "/login":
      mime = "text/html"
      res.setHeader('Set-Cookie', 'user=MONICA')
      content = "Registrado! Cookie enviada al navegador."
      content += "<a href=/><h2> PAGINA PRINCIPAL</h2></a>"
      res.writeHead(200, {'Content-Type': mime});
      res.write(content);
      res.end();
      break;


    default:

      //-- Peticiones de estilo, imágenes, etc...
      let cant = 0;
      //-- Si hay mas de una /, significa que esta dentro de una carpeta
      for(var i = 0; i < q.pathname.length; i++) {
         if (q.pathname[i] == "/")
            cant = cant+1;
       }

       if (cant>1){
          filename = "." + q.pathname
       }else{
          filename = q.pathname.slice(1)
       }

      //-- Encontrar tipo mime
      num = q.pathname.lastIndexOf(".");
      mime = q.pathname.slice(num+1)
      mime = "text/" + mime

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
  }

}

//-- Inicializar el servidor
//-- Cada vez que recibe una petición
//-- invoca a la funcion peticion para atenderla
const server = http.createServer(peticion)

//-- Configurar el servidor para escuchar en el puerto
server.listen(PUERTO);

console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)
