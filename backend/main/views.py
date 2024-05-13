import json
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Products, UsersIP, Categories
from .serializers import ProductsSerializer, RecomendationsSerializer, ProductDetailSerializer, CategoriesListSerializer
from rest_framework import generics, status
from services.utils import get_client_ip
from .utils import find_similar_products


class CategoriesListView(generics.ListAPIView):

    '''Список категорий'''

    queryset = Categories.objects.all()
    serializer_class = CategoriesListSerializer


class RecomendationsListView(generics.ListAPIView):
    
    '''Рекомендации на главной странице'''

    queryset = (Products.objects.filter(popular=True)
                .select_related('categories')
                .prefetch_related('shades')
                .only('id', 'categories', 'title', 'slug', 'price', 'gender', 'Image1', 'datetime', 'shades',
                      'shades__id', 'shades__slug', 'shades__color', 'discount', 'new', 'color', 'popular'))
    
    serializer_class = RecomendationsSerializer


class ProductsListView(generics.ListAPIView):

    '''Вывод товаров по категориям'''

    serializer_class = ProductsSerializer

    def get_queryset(self):
        category = self.kwargs['category']

        if category == 'all':
            queryset = (Products.objects.all()
                    .select_related('categories')
                    .prefetch_related('shades')
                    .only('id', 'categories', 'title', 'slug', 'price', 'gender', 'Image1', 'datetime', 'shades', 'shades__color', 'shades__slug', 'shades__id', 'discount', 'new', 'color', 'available')
                    .order_by('-new', '-datetime'))
            
            return queryset
        
        if category == 'new':
            queryset = (Products.objects.filter(new=True)
                    .select_related('categories')
                    .prefetch_related('shades')
                    .only('id', 'categories', 'title', 'slug', 'price', 'gender', 'Image1', 'datetime', 'shades', 'shades__color', 'shades__slug', 'shades__id', 'discount', 'new', 'color', 'available')
                    .order_by('-new', '-datetime'))
            
            return queryset
        
        if category == 'popular':
            queryset = (Products.objects.filter(popular=True)
                    .select_related('categories')
                    .prefetch_related('shades')
                    .only('id', 'categories', 'title', 'slug', 'price', 'gender', 'Image1', 'datetime', 'shades', 'shades__color', 'shades__slug', 'shades__id', 'discount', 'new', 'color', 'available')
                    .order_by('-new', '-datetime'))
            
            return queryset


        queryset = (Products.objects.filter(categories__slug=category)
                    .select_related('categories')
                    .prefetch_related('shades')
                    .only('id', 'categories', 'title', 'slug', 'price', 'gender', 'Image1', 'datetime', 'shades', 'shades__color', 'shades__slug', 'shades__id', 'discount', 'new', 'color', 'available')
                    .order_by('-new', '-datetime'))
        
        return queryset


class BasketListView(generics.ListAPIView):

    '''Вывод товаров в корзине'''

    serializer_class = ProductsSerializer

    def get_queryset(self):

        basket = json.loads(self.kwargs['basket'])

        queryset = (Products.objects.filter(id__in=basket)
                    .select_related('categories')
                    .prefetch_related('shades')
                    .only('id', 'categories', 'title', 'slug', 'price', 'gender', 'Image1', 'datetime', 'shades', 'shades__color', 'shades__slug', 'shades__id', 'discount', 'new', 'color', 'available')
                    .order_by('-new', '-datetime'))

        return queryset


class ViewsListView(generics.ListAPIView):

    '''Вывод товаров в просмотренных'''

    serializer_class = ProductsSerializer

    def get_queryset(self):

        views = json.loads(self.kwargs['views'])
        user_views = []

        queryset = (Products.objects.filter(id__in=views)
                    .only('id', 'slug', 'Image1', 'datetime'))

        for view in views:
            for product in queryset:
                if product.id == view:
                    user_views.append(product)

        return user_views
    
    
class ProductsDetailView(generics.RetrieveAPIView):

    '''Вывод страницы товара'''

    lookup_field = 'slug'
    serializer_class = ProductDetailSerializer

    def get_object(self):
        
        ip = get_client_ip(self.request)
        object = get_object_or_404(Products.objects.select_related('categories').prefetch_related('shades'), slug=self.kwargs['slug'])

        if object.total_views() > 999:
            object.popular = True
            object.save()
        else:
            user_ip, created = UsersIP.objects.get_or_create(ip=ip)
            object.views.add(user_ip)

        return object


class SimilarListView(generics.ListAPIView):

    '''Вывод похожих товаров'''

    serializer_class = ProductsSerializer

    def get_queryset(self):

        id = self.kwargs['id']

        queryset = find_similar_products(id)

        return queryset
