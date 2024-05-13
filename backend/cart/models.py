from django.db import models
from main.models import Products
from users.models import CustomUser


class UserCart(models.Model):

    '''Корзина авторизованного пользователя'''

    user = models.ForeignKey(CustomUser, verbose_name='Пользователь', on_delete=models.CASCADE)
    date = models.DateTimeField('Дата обновления корзины', auto_now=True)

    def __str__(self):
        return f'Корзина пользователя {self.user.first_name}'
    
    def get_totla_quantity(self):
        '''Стоимость всей корзины'''
        return sum(el.total_price() for el in self.cartitem_set.all().only('id', 'quantity'))
    
    def get_total_len(self):
        '''Общее кол-во товаров в корзине'''
        return sum(el.quantity for el in self.cartitem_set.all().only('id', 'quantity'))
    
    class Meta:
        verbose_name = 'Корзины пользователей'
        verbose_name_plural = 'Корзины пользователей'


class CartItem(models.Model):

    '''Элементы корзины'''

    cart = models.ForeignKey(UserCart, verbose_name='Корзина', on_delete=models.CASCADE)
    product = models.ForeignKey(Products, verbose_name='Продукт', on_delete=models.CASCADE)
    quantity = models.IntegerField('Кол-во товаров', default=0)
    date = models.DateTimeField('Дата добавления товара в корзину', auto_now_add=True)

    def total_price(self):
        '''Общая цена товара'''
        return self.quantity * self.product.total_price()
    
    def __str__(self):
        return f'Продукт из корзины пользователя {self.cart.user.first_name}'
    
    class Meta:
        verbose_name = 'Товары добавленые в корзину'
        verbose_name_plural = 'Товары добавленые в корзину'