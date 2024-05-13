from django.urls import path
from . import views

urlpatterns = [
    path('recomendations/', views.RecomendationsListView.as_view(), name='recomendations'),
    path('catalog/<str:category>', views.ProductsListView.as_view(), name='catalog'),
    path('basket/<basket>', views.BasketListView.as_view(), name='basket'),
    path('views/<views>', views.ViewsListView.as_view(), name='views'),
    path('<slug:slug>', views.ProductsDetailView.as_view(), name='product_page'),
    path('get_categories/', views.CategoriesListView.as_view(), name='get_categories'),
    path('get_similar/<id>', views.SimilarListView.as_view(), name='similar'),
]