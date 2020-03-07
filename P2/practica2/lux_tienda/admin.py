from django.contrib import admin

# Register your models here.
from lux_tienda.models import Producto
from lux_tienda.models import Pedido


admin.site.register(Producto)
admin.site.register(Pedido)
