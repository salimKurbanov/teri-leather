from rest_framework import serializers
from .models import Products, Categories
from decimal import Decimal


class RecomendationsSerializer(serializers.ModelSerializer):

    '''Рекомендации на главной странице'''

    categories = serializers.SlugRelatedField(slug_field='categories', read_only=True)  #Делаем вывод не id а имени категории
    Image1 = serializers.ImageField(required=False)
    Image2 = serializers.ImageField(required=False)
    Image3 = serializers.ImageField(required=False)
    Image4 = serializers.ImageField(required=False)
    Image5 = serializers.ImageField(required=False)

    class Meta:
        model = Products
        fields = '__all__'


class ShadeSerializer(serializers.ModelSerializer):

    '''Вывод оттенков'''

    class Meta:
        model = Products
        fields = ('color', 'id', 'product_color', 'slug')


class ProductsSerializer(serializers.ModelSerializer):

    '''Вывод продуктов'''

    categories = serializers.SlugRelatedField(slug_field='categories', read_only=True)  #Делаем вывод не id а имени категории
    Image1 = serializers.ImageField(required=False)
    Image2 = serializers.ImageField(required=False)
    Image3 = serializers.ImageField(required=False)
    Image4 = serializers.ImageField(required=False)
    Image5 = serializers.ImageField(required=False)
    shades = ShadeSerializer(read_only=True, many=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Products
        fields = '__all__'

    def get_total_price(self, obj):
        return obj.total_price()


class ProductDetailSerializer(serializers.ModelSerializer):

    '''Вывод страницы товара'''

    categories = serializers.SlugRelatedField(slug_field='categories', read_only=True)  #Делаем вывод не id а имени категории
    Image1 = serializers.ImageField(required=False)
    Image2 = serializers.ImageField(required=False)
    Image3 = serializers.ImageField(required=False)
    Image4 = serializers.ImageField(required=False)
    Image5 = serializers.ImageField(required=False)
    shades = ShadeSerializer(read_only=True, many=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Products
        fields = '__all__'

    def get_total_price(self, obj):
        return obj.total_price()


class CategoriesListSerializer(serializers.ModelSerializer):

    '''Вывод списка категорий'''

    image = serializers.ImageField(required=False)

    class Meta:
        model = Categories
        fields = ('id', 'categories_plural', 'slug', 'image')