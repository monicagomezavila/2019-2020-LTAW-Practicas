const http = require('http');
const url = require('url');
const PUERTO = 8080

//-- Configurar el servidor
http.createServer( (req, res) => {
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)

  //-- Analisis de la URL recibida:
  let q = url.parse(req.url, true); //TRUE, PARA CREAR UN OBJETO LLAMADO q PARA ACCEDER A LAS PROPIEDADES

  console.log("Pathname: " +  q.pathname)
  console.log("search: " + q.search) //DESPUES DE LA INTERROGACION
  console.log("Búsqueda:")
  let qdata = q.query //QUERY PROPIEDAD-VALOR
  console.log(qdata)

  //-- Acceso al objeto
  console.log("Artículo: " + qdata.articulo)
  console.log("Color: " + qdata.color)

}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
