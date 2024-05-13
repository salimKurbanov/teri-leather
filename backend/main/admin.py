from django.contrib import admin
from .models import Products, Categories, UsersIP
from django import forms
from django.db.models import Q


admin.site.register(Categories)

class CustomerForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(CustomerForm, self).__init__(*args, **kwargs)
        if Products.objects.filter(categories_id=self.instance.categories_id).exists():   
            filter_list = Products.objects.filter(Q(categories_id=self.instance.categories_id) & Q(title=self.instance.title)).exclude(id=self.instance.id)
            print(filter_list)
        else:
            filter_list = Products.objects.all()
        w = self.fields['shades'].widget
        choices = []
        for choice in filter_list:
            choices.append((choice.id, f'{choice.categories} {choice.title} {choice.product_color}'))
        w.choices = choices


class ProductsAdmin(admin.ModelAdmin):
    list_display = ('title', 'categories', 'gender', 'price', 'datetime')
    list_display_links = ('title',)
    search_fields = ('^title', '^categories__categories', '^gender',)
    #https://groups.google.com/g/Django-users/c/AngrTl5nuA4?pli=1
    filter_horizontal = ('shades',)
    form = CustomerForm

admin.site.register(Products, ProductsAdmin)
admin.site.register(UsersIP)
