# apps/scripts/views.py

from rest_framework import viewsets, permissions
from .models import Script
from .serializers import ScriptSerializer

class ScriptViewSet(viewsets.ModelViewSet):
    serializer_class = ScriptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Script.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()