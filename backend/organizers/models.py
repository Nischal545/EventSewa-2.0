from django.db import models

# Create your models here.
class Organizer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=100)
    liscence_image = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.first_name + " " + self.last_name
