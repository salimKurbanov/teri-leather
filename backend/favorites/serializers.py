from django.shortcuts import get_object_or_404
from rest_framework import serializers
from .models import Favorites
from main.models import Products
from main.serializers import ProductsSerializer


class FavoritesSerializer(serializers.ModelSerializer):

    '''Отложенные товары'''

    products = ProductsSerializer(many=True)

    class Meta:
        model = Favorites
        fields = ('products', )

    def create(self, validated_data):

        instance, created = self.Meta.model.objects.get_or_create(user=self.context["request"].user)

        products = validated_data.pop('products')

        for el in products:
            
            #product = get_object_or_404(Products, **products)

            if el in instance.products.all():
                instance.products.remove(el)
            else:
                instance.products.add(el)

        instance.save()

        return instance
