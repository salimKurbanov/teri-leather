from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator
from services.utils import unique_slugify
from .managers import CustomUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver


GENDERS = (
    (None, 'Выберите пол'),
    ('Мужской', 'Мужской'),
    ('Женский', 'Женский')
)


class CustomUser(AbstractUser):
    username = None
    slug = models.SlugField(verbose_name='URL', max_length=255, blank=True, unique=True)
    city = models.CharField(verbose_name='Город', max_length=30, null=True, blank=True)
    patronymic = models.CharField(verbose_name='Отчество', max_length=30, null=True, blank=True)
    gender = models.CharField(max_length=100, choices=GENDERS)
    date = models.DateField(verbose_name='Дата рождения', null=True, blank=True)
    phone = models.CharField(verbose_name='Телефон', max_length=18, null=True)

    email = models.EmailField(unique=True)   #Присваиваем емайлу уникальное поле, теперь его нужно будет обязательно заполнить

    USERNAME_FIELD = 'email'    #делаем вход по эмайлу
    REQUIRED_FIELDS = []

    """
    Добавляем новый менеджер
    """
    objects = CustomUserManager()

    class Meta:
        """
        Сортировка, название таблицы в базе данных
        """
        db_table = 'app_profiles'
        ordering = ('id',)
        verbose_name = 'Пользователи'
        verbose_name_plural = 'Пользователи'

    def save(self, *args, **kwargs):
        """
        Сохранение полей модели при их отсутствии заполнения
        """
        if not self.slug:
            self.slug = unique_slugify(self, self.email)
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.email)


class SessionKey(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    cart_key = models.TextField(blank=True)
    favorites_key = models.TextField(blank=True)

    def __str__(self):
        return f'Ключ корзины пользователя {self.user.email}'
