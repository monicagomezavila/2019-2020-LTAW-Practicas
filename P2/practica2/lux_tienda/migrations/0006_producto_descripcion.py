# Generated by Django 2.2.10 on 2020-03-12 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lux_tienda', '0005_producto_articulo'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='descripcion',
            field=models.CharField(default='none', max_length=200),
        ),
    ]
