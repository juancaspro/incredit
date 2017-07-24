from django.contrib import admin

from .models import Brand, Car, Plan, CarOption


class CarOptionInline(admin.TabularInline):
    model = CarOption
    extra = 1
    # fieldsets = (
    #         ("general data", {
    #             'fields': (
    #                 'model',
    #                 ('package', 'price'),
    #                 ('is_active'))
    #         }),
    #         ('account data', {
    #             'fields': ('description',)
    #         }),
    # )


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'is_active']
    list_filter = ['is_active']


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ['id', 'brand', 'name', 'type', 'is_active']
    search_fields = ['name', 'brand']
    inlines = [CarOptionInline,]
    list_filter = ['is_active', 'brand', 'type']


@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'time', 'type', 'is_active']
    search_fields = ['name', 'type']
    list_filter = ['is_active', 'type']