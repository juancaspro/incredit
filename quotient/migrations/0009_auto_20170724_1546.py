# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-07-24 20:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quotient', '0008_caroption_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='type',
            field=models.IntegerField(choices=[(1, b'Autos'), (2, b'SUV'), (3, b'Pickups'), (4, b'Vans'), (5, b'Deportivos'), (6, b'El\xc3\xa9ctricos')], verbose_name=b'Tipo de carro'),
        ),
        migrations.AlterField(
            model_name='caroption',
            name='description',
            field=models.TextField(verbose_name=b'Descripci\xc3\xb3n del paquete'),
        ),
        migrations.AlterField(
            model_name='caroption',
            name='model',
            field=models.IntegerField(verbose_name=b'A\xc3\xb1o'),
        ),
        migrations.AlterField(
            model_name='plan',
            name='commission',
            field=models.DecimalField(decimal_places=2, max_digits=4, verbose_name=b'Comisi\xc3\xb3n por apertura'),
        ),
        migrations.AlterField(
            model_name='plan',
            name='interest_rate',
            field=models.DecimalField(decimal_places=2, max_digits=4, verbose_name=b'Tasa de inter\xc3\xa9s'),
        ),
        migrations.AlterField(
            model_name='plan',
            name='type',
            field=models.IntegerField(choices=[(1, b'Cr\xc3\xa9dito automotriz'), (2, b'Arrendamiento Puro')], verbose_name=b'Tipo de cr\xc3\xa9dito'),
        ),
    ]