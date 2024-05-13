from rest_framework import serializers
from .cart import Cart
from .models import CartItem, UserCart
from main.serializers import ProductsSerializer


class UserCartSerializer(serializers.ModelSerializer):

    '''Вывод корзины'''

    user = serializers.SlugRelatedField(slug_field='first_name', read_only=True)

    class Meta:
        model = UserCart
        fields = '__all__'


class CartItemCreateSerializer(serializers.ModelSerializer):

    '''Добавление продуктов в корзину'''

    class Meta:
        model = CartItem
        fields = '__all__'

    def create(self, validated_data):
        instance, created = self.Meta.model.objects.get_or_create(cart=validated_data.get('cart'), product=validated_data.get('product'))
        if not created:
            instance.quantity += self.data.get('quantity')
            instance.save()
        return instance


class CartItemUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = ('quantity', )


class CartItemSerializer(serializers.ModelSerializer):

    '''Вывод элементов корзины'''

    product = ProductsSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = '__all__'
