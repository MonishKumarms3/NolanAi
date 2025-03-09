# apps/scripts/models.py

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Script(models.Model):
    SCRIPT_TYPES = [
        ('1', 'Feature Film'),
        ('2', 'TV Show'),
        ('3', 'Social Media'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=1, choices=SCRIPT_TYPES)
    description = models.TextField(blank=True)
    content = models.TextField(default='')  

    def __str__(self):
        return self.title
