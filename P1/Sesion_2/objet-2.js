let mi_objeto = {
  nombre: "mi-elemento",
  x : 10,
  y : 20
}

//-- Recorrer todas las propiedades
//-- del objeto
for (prop in mi_objeto) {
  console.log("Propiedad: " + prop + " --> Valor: " + mi_objeto[prop]) //SOLO SE PUEDE ACCEDER COMO UN DICCIONARIO, por si se crea un objeto dinamicamente
}
