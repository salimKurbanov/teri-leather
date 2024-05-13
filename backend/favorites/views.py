from django.shortcuts import get_object_or_404, render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import FavoritesSerializer
from .models import Favorites
from rest_framework.permissions import IsAuthenticated
from main.models import Products


class FavoritesListView(generics.ListAPIView):

    '''Список отложенных товаров'''

    queryset = Favorites.objects.all()
    serializer_class = FavoritesSerializer
    permission_classes = [IsAuthenticated, ]


class FavoritesCreateView(generics.CreateAPIView):

    '''Добавление товаров в отложенные'''

    queryset = Favorites.objects.all()
    serializer_class = FavoritesSerializer
    permission_classes = [IsAuthenticated, ]


class FavoritesClearView(generics.DestroyAPIView):

    '''Удаление всех отложенных товаров'''

    lookup_field = 'id'
    queryset = Favorites.objects.all()
    serializer_class = FavoritesSerializer
    permission_classes = [IsAuthenticated, ]


class FavoritesRemoveView(APIView):

    '''Удаление товара из отложенных'''

    def delete(self, request, *args, **kwargs):

        queryset = Favorites.objects.get(user=request.user)
        id = kwargs.get('id', None)

        if not id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        product = get_object_or_404(Products, id=id)

        queryset.products.remove(product)

        return Response({'massage': 'Товар удалён из отложенных'}, status=status.HTTP_200_OK)
