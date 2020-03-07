from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from lux_tienda.models import Producto, Pedido

# Create your views here.
def index(request):
    productos = Producto.objects.all()
    return render(request, 'index.html')

def lamina1(request):
    lamina1 = Producto.objects.all()[0]
    return render(request, 'lam.html', {'lamina':lamina1})

def lamina2(request):
    lamina2 = Producto.objects.all()[1]
    return render(request, 'lam.html', {'lamina':lamina2})

def lamina3(request):
    lamina3 = Producto.objects.all()[2]
    return render(request, 'lam.html', {'lamina':lamina3})

def formulario_pedido(request):
    return render(request, 'formulario_pedido.html', {})

def recepcion_pedido(request):
    # -- Obtener el nombre de la persona
    persona = request.POST['nombre']
    articulo = request.POST['articulo']
    # -- Imprimirlo en la consola del servidor
    print(f" PEDIDO RECIBIDO!!! ----> {persona}")
    print(f" PEDIDO RECIBIDO!!! ----> {articulo}")

    pedido_nuevo = Pedido(nombre=persona, articulo=articulo)
    pedido_nuevo.save()


    return HttpResponse("Datos recibidos!!. Comprador: " + persona + articulo)
