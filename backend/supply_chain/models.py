from django.db import models

class Location(models.Model):
    department = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    distribution_center = models.CharField(max_length=100)
    crop_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.city}, {self.department}"