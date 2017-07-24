from django.db import models


class Home(models.Model):
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=100)
    img = models.ImageField(blank=True)


class Us(models.Model):
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=100)
    text = models.TextField()
    img = models.ImageField(blank=True)

    class Meta:
        verbose_name = "Nosotros"
        verbose_name_plural = "Nosotros"
        default_permissions = ('add', 'change', 'delete', 'show', 'list')


class Mission(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()


class Vision(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()


class FooterLink(models.Model):
    text = models.CharField(max_length=50)
    link = models.URLField()