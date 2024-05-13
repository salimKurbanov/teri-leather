from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.FavoritesListView.as_view(), name='favorites_list'),
    path('create/', views.FavoritesCreateView.as_view(), name='favorites_create'),
    path('clear/<int:id>', views.FavoritesRemoveView.as_view(), name='favorites_clear'),
    path('remove/', views.FavoritesRemoveView.as_view(), name='favorites_remove'),
]