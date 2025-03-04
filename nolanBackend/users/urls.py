from django.urls import path
from . import views

urlpatterns = [
    path('google/', views.GoogleAuthView.as_view(), name='google_auth'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('me/', views.UserDetailView.as_view(), name='user_detail'),
]