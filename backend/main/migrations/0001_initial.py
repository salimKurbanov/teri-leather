# Generated by Django 5.0.2 on 2024-02-17 20:42

import colorfield.fields
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categories_plural', models.CharField(max_length=30, null=True, verbose_name='Категория товаров')),
                ('categories', models.CharField(max_length=30, verbose_name='В единственном числе')),
                ('for_men', models.BooleanField(blank=True, default=False, verbose_name='Для мужчин')),
                ('for_women', models.BooleanField(blank=True, default=False, verbose_name='Для женщин')),
            ],
            options={
                'verbose_name': 'Категории товаров',
                'verbose_name_plural': 'Категории товаров',
            },
        ),
        migrations.CreateModel(
            name='UsersIP',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gender', models.CharField(choices=[(None, 'Выберите пол'), ('Мужской', 'Мужской'), ('Женский', 'Женский')], max_length=20)),
                ('title', models.CharField(max_length=20, verbose_name='Название товара')),
                ('descriprion', models.TextField(verbose_name='Описание товара')),
                ('price', models.DecimalField(decimal_places=2, max_digits=50, verbose_name='Цена')),
                ('discount', models.IntegerField(blank=True, default=0, verbose_name='Скидка')),
                ('color', colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=[('#FFFFFF', 'белый'), ('#000000', 'черный')])),
                ('product_color', models.CharField(max_length=20, verbose_name='Название цвета')),
                ('material', models.CharField(max_length=50, verbose_name='Материал изделия')),
                ('Image1', models.ImageField(blank=True, upload_to='images/', verbose_name='Главное изображение товара')),
                ('Image2', models.ImageField(blank=True, upload_to='images/', verbose_name='Изображение товара')),
                ('Image3', models.ImageField(blank=True, upload_to='images/', verbose_name='Изображение товара')),
                ('Image4', models.ImageField(blank=True, upload_to='images/', verbose_name='Изображение товара')),
                ('Image5', models.ImageField(blank=True, upload_to='images/', verbose_name='Изображение товара')),
                ('work', models.CharField(max_length=20, verbose_name='Вид работы')),
                ('tags', models.CharField(max_length=200, null=True)),
                ('datetime', models.DateTimeField(auto_now_add=True, null=True, verbose_name='Время создания')),
                ('available', models.BooleanField(blank=True, default=False, verbose_name='Нет в наличии')),
                ('new', models.BooleanField(blank=True, default=False, verbose_name='Новинка')),
                ('popular', models.BooleanField(blank=True, default=False, verbose_name='Популярное')),
                ('search_field', models.CharField(blank=True, editable=False, max_length=100, verbose_name='Теги поиска')),
                ('slug', models.SlugField(blank=True, editable=False, max_length=265, unique=True, verbose_name='Ссылка на товар')),
                ('categories', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.categories', verbose_name='Категория товара')),
                ('shades', models.ManyToManyField(blank=True, to='main.products', verbose_name='Оттенки')),
                ('views', models.ManyToManyField(blank=True, editable=False, to='main.usersip')),
            ],
            options={
                'verbose_name': 'Товары',
                'verbose_name_plural': 'Товары',
            },
        ),
    ]
