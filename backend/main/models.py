from typing import Iterable
from django.db import models
from django.db import models
from django.db.models import Q
from services.utils import unique_slugify
from colorfield.fields import ColorField
from django.utils.functional import cached_property
from decimal import Decimal


class UsersIP(models.Model):
    ip = models.CharField(max_length=100)

    def __str__(self):
        return self.ip
    

class Categories(models.Model):
    categories_plural = models.CharField('Категория товаров', max_length=30, null=True)
    categories = models.CharField('В единственном числе', max_length=30)
    for_men = models.BooleanField('Для мужчин', default=False, blank=True)
    for_women = models.BooleanField('Для женщин', default=False, blank=True)
    slug = models.SlugField('Ссылка', unique=True, editable=False, blank=True, null=True, max_length=265)
    image = models.ImageField('Обложка',blank=True, upload_to='images/', null=True)

    def __str__(self):
        return self.categories_plural
    
    def save(self, *args, **kwargs):

        context = self.categories_plural
        if not self.slug:
            self.slug = unique_slugify(self, context)

        return super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Категории товаров'
        verbose_name_plural = 'Категории товаров'


GENDER = (
    (None, 'Выберите пол'),
    ('Мужской', 'Мужской'),
    ('Женский', 'Женский'),
)


class Products(models.Model):
    COLOR_PALETTE = [
        ("#FFFFFF", "белый",),
        ("#000000", "черный",),
    ]
    categories = models.ForeignKey(Categories, verbose_name='Категория товара', on_delete=models.CASCADE)
    gender = models.CharField(max_length=20, choices=GENDER)
    title = models.CharField('Название товара', max_length=20)
    descriprion = models.TextField('Описание товара')
    price = models.DecimalField('Цена', max_digits=50, decimal_places=2)
    discount = models.IntegerField('Скидка', blank=True, default=0)
    color = ColorField(samples=COLOR_PALETTE)
    product_color = models.CharField('Название цвета', max_length=20)
    shades = models.ManyToManyField('self', verbose_name='Оттенки', blank=True)
    material = models.CharField('Материал изделия', max_length=50)
    Image1 = models.ImageField('Главное изображение товара',blank=True, upload_to='images/')
    Image2 = models.ImageField('Изображение товара',blank=True, upload_to='images/')
    Image3 = models.ImageField('Изображение товара',blank=True, upload_to='images/')
    Image4 = models.ImageField('Изображение товара',blank=True, upload_to='images/')
    Image5 = models.ImageField('Изображение товара',blank=True, upload_to='images/')
    work = models.CharField('Вид работы', max_length=20)
    tags = models.CharField(max_length=200, null=True)
    datetime = models.DateTimeField('Время создания', auto_now_add=True, null=True)
    available = models.BooleanField('Нет в наличии', default=False, blank=True)
    new = models.BooleanField('Новинка', blank=True, default=False)
    popular = models.BooleanField('Популярное', blank=True, default=False)
    search_field = models.CharField('Теги поиска', max_length=100, blank=True, editable=False)
    views = models.ManyToManyField(UsersIP, blank=True, editable=False)
    slug = models.SlugField('Ссылка на товар', unique=True, blank=True, max_length=265, editable=False)

    def total_price(self):
        discounted_price = (self.price * self.discount) / 100
        return round((self.price - discounted_price), 2)

    def total_views(self):
        return self.views.count()

    def save(self, *args, **kwargs):
        
        """
        Сохранение полей модели при их отсутствии заполнения
        """

        if not self.search_field:
            self.search_field = f'{self.categories} {self.title}'

        context = f'{self.title}-{self.product_color}'
        if not self.slug:
            self.slug = unique_slugify(self, context)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.categories} {self.title} {self.product_color}'

    class Meta:
        verbose_name = 'Товары'
        verbose_name_plural = 'Товары'


