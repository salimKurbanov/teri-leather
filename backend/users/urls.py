from django.urls import path
from . import views

urlpatterns = [
    path('email/verify', views.EmailVerify.as_view()),
]