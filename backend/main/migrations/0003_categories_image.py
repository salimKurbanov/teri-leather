# Generated by Django 5.0.2 on 2024-04-29 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_categories_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='categories',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/', verbose_name='Обложка'),
        ),
    ]
