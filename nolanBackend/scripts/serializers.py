

from rest_framework import serializers
from .models import Script

class ScriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Script
        fields = ['id', 'user', 'title', 'type', 'description', 'content']
        read_only_fields = ['id', 'user']
