from django.db import models
from users.models import CustomUser
from main.models import Products


class Favorites(models.Model):

    '''Отложенные товары'''

    user = models.ForeignKey(CustomUser, verbose_name='Пользователь', on_delete=models.CASCADE)
    products = models.ManyToManyField(Products, verbose_name='Отложенные товары', blank=True)

    def get_favorites_len(self):
        '''Кол-во отложенных товаров'''
        return self.products.count()
    
    def __str__(self) -> str:
        return f'Отложенные товары пользователя {self.user.first_name}'

    class Meta:
        verbose_name = 'Отложенные товары'
        verbose_name_plural = 'Отложенные товары'