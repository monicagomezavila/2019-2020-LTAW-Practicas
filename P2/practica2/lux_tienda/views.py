from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from lux_tienda.models import Producto

# Create your views here.
def index(request):
    return render(request, 'index.html', {'intento':'hola'})

def basedatos(request):
    productos = Producto.objects.all()
    number = Producto.objects.count()
    number = number%2;
    list1 = Producto.objects.all()[:number]
    list2 = Producto.objects.all()[number:]

    return render(request, 'basedatos.html', {'productos':productos, 'number':number, 'list1':list1, 'list2':list2})

def lamina1(request):
    lamina1 = Producto.objects.all()[0]
    return render(request, 'lam.html', {'lamina1':lamina1})
