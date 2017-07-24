from django.contrib import admin

from .models import Home, Us, Mission, Vision, FooterLink


@admin.register(Home)
class HomeAdmin(admin.ModelAdmin):
    pass


@admin.register(Us)
class UsAdmin(admin.ModelAdmin):
    pass


@admin.register(Mission)
class MissionAdmin(admin.ModelAdmin):
    pass


@admin.register(Vision)
class VisionAdmin(admin.ModelAdmin):
    pass


@admin.register(FooterLink)
class FooterLinkAdmin(admin.ModelAdmin):
    pass