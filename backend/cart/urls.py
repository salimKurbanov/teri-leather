from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.CartListView.as_view(), name='cart_list'),
    path('add/', views.CartAddView.as_view(), name='cart_add'),
    path('update/<int:id>', views.CartUpdateView.as_view(), name='cart_update'),
    path('remove/<int:id>', views.CartRemoveView.as_view(), name='cart_remove'),
    path('clear/', views.CartClearView.as_view(), name='cart_clear'),
]