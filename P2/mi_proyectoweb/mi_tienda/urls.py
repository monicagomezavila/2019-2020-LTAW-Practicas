from django.urls import path

# -- Importar todas las vistas de mi_tienda
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Metemos de momento sólo la principal (índice)

urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'), #cuando solicitan lka pagina principal, asocias que vaya a la de VIEWS
    path('test1/', views.test1, name='test1'),
    path('test2/', views.test2, name='test2'),
    path('test3/', views.test3, name='test3'), #NO FUNCIONA
    path('test4/', views.test4, name='test4'),
    path('test5/', views.test5, name='test5'),
]
#HAY QUE ASOCIARLO AL PROYECTO GLOBAL!! en proyecto web
