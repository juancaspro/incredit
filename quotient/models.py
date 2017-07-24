# -*- coding: utf-8 -*-

from django.db import models

TIMES = (
    (12, "12 Meses"),
    (24, "24 Meses"),
    (36, "36 Meses"),
    (48, "48 Meses"),
    (60, "60 Meses")
)

PLAN_TYPE = (
    (1, "Crédito automotriz"),
    (2, "Arrendamiento Puro")
)

CAR_TYPE = (
    (1, "Autos"),
    (2, "SUV"),
    (3, "Pickups"),
    (4, "Vans"),
    (5, "Deportivos"),
    (6, "Eléctricos")
)


class Brand(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre")
    is_active = models.BooleanField(default=True, verbose_name="Estatus")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Marca"
        verbose_name_plural = "Marcas"
        default_permissions = ('add', 'change', 'delete', 'show', 'list')


class Car(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre", unique=True)
    brand = models.ForeignKey(Brand, verbose_name="Marca")
    type = models.IntegerField(choices=CAR_TYPE, verbose_name="Tipo de carro")
    is_active = models.BooleanField(default=True, verbose_name="Estatus")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Carro"
        verbose_name_plural = "Carros"
        default_permissions = ('add', 'change', 'delete', 'show', 'list')


class CarOption(models.Model):
    car = models.ForeignKey(Car, verbose_name="Carro")
    model = models.IntegerField(verbose_name="Año")
    package = models.CharField(max_length=100, verbose_name="Paquete")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio")
    description = models.TextField(verbose_name="Descripción del paquete")
    is_active = models.BooleanField(default=True, verbose_name="Estatus")

    def __str__(self):
        return "%s %s (%s)" % (self.car, str(self.model), self.package)

    class Meta:
        verbose_name = "Opciones del carro"
        verbose_name_plural = "Opciones de los carros"
        default_permissions = ('add', 'change', 'delete', 'show', 'list')


class Plan(models.Model):
    name = models.CharField(max_length=100, verbose_name="Plan")
    type = models.IntegerField(choices=PLAN_TYPE, verbose_name="Tipo de crédito")
    time = models.IntegerField(choices=TIMES, verbose_name="Tiempo")
    interest_rate = models.DecimalField(max_digits=4, decimal_places=2, verbose_name="Tasa de interés")
    hitch = models.IntegerField(verbose_name="Enganche")
    commission = models.DecimalField(max_digits=4, decimal_places=2, verbose_name="Comisión por apertura")
    is_active = models.BooleanField(default=True, verbose_name="Estatus")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Plan de financiamiento"
        verbose_name_plural = "Planes de financiamiento"
        default_permissions = ('add', 'change', 'delete', 'show', 'list')