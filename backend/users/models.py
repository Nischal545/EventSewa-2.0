from django.db import models


# from views import caching_data

# caching data blueprint -> [[{data}, otp]]

# Create your models here.
class Caching(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(null=True, blank=True)
    password = models.CharField(max_length=100)
    otp = models.IntegerField(null=True, blank=True)
    verified = models.BooleanField(default=False)
