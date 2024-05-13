from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from .cart import Cart
from .models import UserCart, CartItem
from .serializers import CartItemSerializer, CartItemCreateSerializer, CartItemUpdateSerializer
from main.models import Products
from rest_framework.response import Response


class CartListView(APIView):

    '''Вывод корзины'''

    def get(self, request):

        if request.user.is_authenticated:
            serializer = CartItemSerializer
            cart = (CartItem.objects.filter(cart__user=request.user)
                    .select_related('cart', 'product_categories').only('id', 'quantity', 'cart_id', 'product__id', 'product__title', 'product__product_color', 'product__slug', 'product__categories', 'product__gender', 'product__price', 'product__Image1', 'product__discount', 'date')
                    .order_by('-date'))
            cart_len = 0
            cart_total_price = 0
            for el in cart:
                cart_len += el.quantity
                cart_total_price += el.quantity * el.product.total_price()
            cart_post = serializer(cart).data

        else:
            cart = Cart(request)
            cart_total_price = cart.get_total_price()
            cart_len = cart.get_cart_len()
            cart_post = list(cart.__iter__())

        return Response({'cart': cart_post, 'total_price': cart_total_price, 'total_qantity': cart_len})


class CartAddView(APIView):

    '''Добавление товара в корзину'''

    def post(self, request):

        if request.user.is_authenticated:

            cart, created = UserCart.objects.get_or_create(user=request.user)

            serializer = CartItemCreateSerializer(data=request.data)
            serializer.is_valid()
            serializer.save()

            return Response({'massage': 'Товар добавлен в корзину'}, status=status.HTTP_201_CREATED)

        else:
            product = get_object_or_404(Products, id=request.data['product'])
            cart = Cart(request)
            cart.add(product=product,
                        quantity=request.data['quantity'],
                        update_quantity=False)
        
            return Response({'massage': 'Товар добавлен в корзину'}, status=status.HTTP_201_CREATED)
    

class CartUpdateView(APIView):

    '''Увеличение кол-во товара'''
    
    def put(self, request, *args, **kwargs):

        id = kwargs.get('id', None)

        if not id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
                    
        product = get_object_or_404(Products, id=id)    

        if request.user.is_authenticated:
            cart = UserCart.objects.get(user=request.user)
            cart_item = get_object_or_404(CartItem, cart=cart, product=product)

            serializer = CartItemUpdateSerializer(data=request.data, instance=cart_item)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:
            cart = Cart(request)
            cart.add(product=product,
                     quantity=request.data['quantity'],
                     update_quantity=True)

        return Response({'massage': 'Кол-во товаров изменено'}, status=status.HTTP_200_OK)
    

class CartRemoveView(APIView):

    '''Удаление товара из корзины'''

    def delete(self, request, *args, **kwargs):

        id = kwargs.get('id', None)

        if not id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        product = get_object_or_404(Products, id=id)

        if request.user.is_authenticated:
            cart = UserCart.objects.get(user=request.user)
            cart_item = get_object_or_404(CartItem, cart=cart, product=product)
            cart_item.delete()
        else:
            cart = Cart(request)
            cart.remove(product)

        return Response({'massage': 'Товар удалён из корзины'}, status=status.HTTP_200_OK)


class CartClearView(APIView):

    '''Очищение корзины'''

    def delete(self, request):

        if request.user.is_authenticated:
            cart = UserCart.objects.get(user=request.user)
            cart_item = CartItem.objects.filter(cart=cart)
            cart_item.delete()
        else:
            cart = Cart(request)
            cart.clear()

        return Response({'massage': 'Корзина очищена'}, status=status.HTTP_200_OK)
