# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-06-15 14:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='us',
            options={'default_permissions': ('add', 'change', 'delete', 'show', 'list'), 'verbose_name': 'Nosotros', 'verbose_name_plural': 'Nosotros'},
        ),
        migrations.AlterField(
            model_name='home',
            name='img',
            field=models.ImageField(blank=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='us',
            name='img',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]