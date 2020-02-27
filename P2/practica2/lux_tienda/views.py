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
    return render(request, 'basedatos.html', {'productos':productos})
