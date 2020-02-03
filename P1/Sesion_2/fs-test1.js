//-- Acceso al módulo fs, para lectura de ficheros
const fs = require('fs'); // OBJETO CONSTANTE (FILE SYSTEM)

//-- Funcion llamada cuando se ha terminado de leer el fichero
function show_file(err, data) {

    //-- Mostrar el contenido del fichero
    console.log(data)
}

//-- Leer el fichero. Al terminar se invoca a la función show_file
fs.readFile('text.txt', 'utf8', show_file); //INDICAR TIPO DE TEXTO Y FUNCION DE RETROLLAMDA (la llama cuando termina)
