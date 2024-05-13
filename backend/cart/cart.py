from decimal import Decimal
from django.conf import settings
from main.models import Products
from django.forms.models import model_to_dict
from main.serializers import ProductsSerializer
import copy


class Cart(object):

    def __init__(self, request):
        """Инициализируем корзину"""
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart

    def add(self, product, quantity=1, update_quantity=False):
        """Добалвение продуктов в корзину"""
        product_id = str(product.id)
        if product_id not in self.cart:
            self.cart[product_id] = {'quantity': 0, 'price': str(product.total_price())}
        if update_quantity:
            self.cart[product_id]['quantity'] = quantity
        else:
            self.cart[product_id]['quantity'] += quantity
        self.save()

    def save(self):
        """обновление сессии"""
        self.session[settings.CART_SESSION_ID] = self.cart
        self.session.modified = True

    def remove(self, product):
        """Удаление товара из корзины"""
        product_id = str(product.id)
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    def __iter__(self):
        """перебор элементов в корзине"""
        product_ids = self.cart.keys()
        products = (Products.objects.filter(id__in=product_ids)
                    .select_related('categories')
                    .only('id', 'title', 'slug', 'categories', 'gender', 'price', 'Image1'))
        cart = copy.deepcopy(self.cart)
        for product in products:
            cart[str(product.id)]['product'] = ProductsSerializer(product).data

        for item in cart.values():
            item['price'] = Decimal(item['price'])
            item['total_price'] = item['price'] * item['quantity']
            yield item

    def get_cart_len(self):
        """подсчёт кол-ва товаров в корзине"""
        return sum(item['quantity'] for item in self.cart.values())

    def get_total_price(self):
        """подсчет стоимости всей корзины"""
        return sum(Decimal(item['price']) * item['quantity'] for item in self.cart.values())

    def clear(self):
        """удаление корзины из сессии"""
        del self.session[settings.CART_SESSION_ID]
        self.session.modified = True