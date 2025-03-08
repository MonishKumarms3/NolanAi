

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScriptViewSet

router = DefaultRouter()
router.register(r'scripts', ScriptViewSet, basename='script')  # Add basename

urlpatterns = [
    path('', include(router.urls)),
]