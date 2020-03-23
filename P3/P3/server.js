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
  //console.log("Cookie: " + cookie)

  let productos = ["FPGA-1", "RISC-V", "74ls00", "FPGA-2", "74ls01", "AVR", "Arduino-UNO"];


  //-- Funcion que devuelve el valor de una cookie segun el nombre de la misma que se le pasa
  function readCookie(name){
    if (cookie){
    var nameEQ = name + "=";
    var ca = cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        return decodeURIComponent( c.substring(nameEQ.length,c.length) );
      }
    }
    return null;
  //-- No hay cookie definidas
  }else{
    return null;
  }
}


  //-- Dependiendo a que recurso accedan
  switch (q.pathname) {

    case "/":
    //-- Genero un html segun el estado de la cookie
      content = fs.readFileSync("index.html", "utf-8")

      user_cookie = readCookie("user");
      if (!user_cookie) {
        content += "<div id = 'registro'><a href=/login><h2> SISTEMA DE REGISTRO</h2></a></div></div></body></html>"
      //-- Hay definida una Cookie
      } else {
        content += "<div id = 'registrado'><p> Bienvenido a mi tienda " + user_cookie + "</hp></div></div></body></html>"
      }

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();

      break;


    case "/login":
      res.setHeader('Set-Cookie', 'user=MONICA')
      content = "Registrado! Cookie enviada al navegador."
      content += "<a href=/><h2> PAGINA PRINCIPAL</h2></a>"

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
      break;


    case "/prod1carrito":
    //-- Se añade el producto 1 al carrito
      carrito_cookie = readCookie("carrito")
      if (!carrito_cookie){
        res.setHeader('Set-Cookie', 'carrito=producto1')
      }else{
        new_cookie = 'carrito=producto1&' + carrito_cookie
        res.setHeader('Set-Cookie', new_cookie)
      }

      content = "Ya hemos tenemos tu producto en el carrito!!!"
      content += "<a href=/><h2> PAGINA PRINCIPAL</h2></a>"

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
      break;


    case "/prod2carrito":
    //-- Se añade el producto 1 al carrito
      carrito_cookie = readCookie("carrito")
      if (!carrito_cookie){
        res.setHeader('Set-Cookie', 'carrito=producto2')
      }else{
        new_cookie = 'carrito=producto2&' + carrito_cookie
        res.setHeader('Set-Cookie', new_cookie)
      }

      content = "Ya hemos tenemos tu producto en el carrito!!!"
      content += "<a href=/><h2> PAGINA PRINCIPAL</h2></a>"

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
      break;


    case "/prod3carrito":
    //-- Se añade el producto 1 al carrito
      carrito_cookie = readCookie("carrito")
      if (!carrito_cookie){
        res.setHeader('Set-Cookie', 'carrito=producto2')
      }else{
        new_cookie = 'carrito=producto2&' + carrito_cookie
        res.setHeader('Set-Cookie', new_cookie)
      }

      content = "Ya hemos tenemos tu producto en el carrito!!!"
      content += "<a href=/><h2> PAGINA PRINCIPAL</h2></a>"

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
      break;

    case "/formulario":
    if (req.method === 'POST') {

        var content = fs.readFileSync("compra.html", "utf-8")

        req.on('data', chunk => {
            //-- Leer los datos (convertir el buffer a cadena)
            data = chunk.toString();

            //-- Para sacar los datos introducidos por el usuario
            var cadena = data.split('&');
            content += "<ol>"
            for(var i=0;i < cadena.length;i++){
              num_equal = cadena[i].lastIndexOf("=");
              clave = cadena[i].slice(0,num_equal);
              valor = cadena[i].slice(num_equal+1)
              content += "<li><p>" + clave + " : " + valor + "</p></li>"
            }


            //-- Para sacar los datos de la cookie de carrito_cookie
            carrito_cookie = readCookie("carrito")
            if (carrito_cookie){
              content += "<li><p>CARRITO: "+ carrito_cookie +"</p></li>"
            }else{
              content += "<p> NO TIENES CARRITO DE COMPRA, ECHA UN VISTAZO ;)</p>"
            }
            //-- Fin del mensaje. Enlace al formulario
            content += `</ol>
                <a href="/">Pagina principal</a>
              </body>
            </html>
            `
            res.statusCode = 200;
         });

         req.on('end', ()=> {
           //-- Generar el mensaje de respuesta
           res.setHeader('Content-Type', 'text/html')
           res.write(content);
           res.end();
         })
         return
      }
      break

    case "/client.js":
      fs.readFile("./client.js", (err, data) => {
        //-- Generar el mensaje de respuesta
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.write(data);
        res.end();
        return
      });
      break;

    //-- Acceso al recurso JSON
    case "/myquery":

      //-- El array de productos lo pasamos a una cadena de texto,
      //-- en formato JSON:
      //content = JSON.stringify(productos) + '\n';

      const params = q.query;

      var same = new Boolean("false")

      content = "[ "
      for(var i = 0; i < productos.length; i++) {
        j = 0;
        while (j < params.param1.length) {
          if (params.param1[j].toLowerCase() != productos[i][j].toLowerCase()){
            same = "false";
             break;
          }else{
            same = "true";
          }
          j++;
        }
        if (same == "true"){
          content += '"' + productos[i] + '",' ;
        }
      }
      content = content.slice(0,-1)
      content += "]"
      console.log(content)
      //content = JSON.stringify(content) + '\n';


      //-- Generar el mensaje de respuesta
      //-- IMPORTANTE! Hay que indicar que se trata de un objeto JSON
      //-- en la cabecera Content-Type
      res.setHeader('Content-Type', 'application/json')
      res.write(content);
      res.end();
      return
      break

    case "/busqueda":
      fs.readFile("./pet_ajax.html", (err, data) => {
        //-- Generar el mensaje de respuesta
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
        return
      });
      break;


    default:

      var filename = ""
      var mime = ""
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
