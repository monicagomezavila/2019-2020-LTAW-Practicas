from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from lux_tienda.models import Producto

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
