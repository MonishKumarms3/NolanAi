# ai/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('generate-image/', views.generate_image, name='generate_image'),
    path('fix-grammar/', views.fix_grammar, name='fix_grammar'),
    path('adjust-tone/', views.adjust_tone, name='adjust_tone'),
    path('chatgpt/',views.chatgpt_response, name='chatgpt_response')
]