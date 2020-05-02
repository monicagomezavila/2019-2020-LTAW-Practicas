# 2019-2020-LTAW-Practicas
# Práctica 2 (Carpeta: P2/practica2 "lux_tienda")

Lanzar servidor:
  "python manage.py runserver" o "python3 manage.py runserver"
  (TODOS LOS PRODUCTOS SE MUESTRAN EN LA PÁGINA PRINCIPAL, si se añaden a la base de datos)

Navegador:
  "localhost:8000"
  "localhost:8000/pedido"

Añadir un dato en uno de los modelos de la base de datos:
  1. models.py en lux_tienda, poner un default
  2. python manage.py makemigrations
  3. python3 manage.py migrate

Añadir un nuevo modelo en la base de datos:
  1. admin.py en lux_tienda y añadir
  2. models.py en lux_tienda y desarrollar el nuevo modelo

Añadir un nuevo producto:
  1. Añadir ese producto a la base de datos en "http://localhost:8000/admin" (contraseña:contraseña; usuario:mgavila)
  2. Añadir una nueva vista en views.py del nuevo producto en lux_tienda
  3. Añadir la url del nuevo producto en urls.py en lux_tienda
