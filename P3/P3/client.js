
//-- Traza de prueba
console.log("Hola!")

//-- Obtener el botón de VER del DOM
const ver = document.getElementById('ver')

//-- Obtener el párrafo del DOM donde mostrar el resultado
const resultado = document.getElementById('resultado');

const peticion = document.getElementById('peticion');

//-- Cada vez que el usuario escribe una letra en la caja
function myFunction(event) {
      var x = document.getElementById("peticion").value;
      console.log(x)

      //-- Crear objeto para hacer peticiones AJAX
      const m = new XMLHttpRequest();

      pet = "http://localhost:8080/myquery?param1="
      pet += x;

      //-- Configurar la petición
      m.open("GET",pet, true);

      //-- Cuando la haya alguna noticia sobre la peticion
      //-- ejecuta este código
      m.onreadystatechange=function(){
         //-- Petición enviada y recibida. Todo OK!
         if (m.readyState==4 && m.status==200){

           //-- La respuesta es un objeto JSON
           let productos = JSON.parse(m.responseText)

           //-- Borrar el resultado anterior que hubiese en el párrafo
           //-- de resultado
           resultado.innerHTML = "";

           //--Recorrer los productos del objeto JSON
           for (let i=0; i < productos.length; i++) {

             //-- Añadir cada producto al párrafo de visualización
             resultado.innerHTML += productos[i];

             //-- Separamos los productos por ',''
             if (i < productos.length-1) {
               resultado.innerHTML += ', ';
             }
           }
         }
       }

       //-- Enviar la petición!
       m.send();

}
