from django.urls import path

# -- Importar todas las vistas de mi_tienda
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Metemos de momento sólo la principal (índice)

urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),
    path('lamina1/', views.lamina1, name='lamina1'),
    path('lamina2/', views.lamina2, name='lamina2'),
    path('lamina3/', views.lamina3, name='lamina3'),
]
