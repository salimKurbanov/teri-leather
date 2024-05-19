import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .models import CustomUser
from .serializers import CustomUserSerializer, CustomUserCreateSerializer, EmailVerifySerializer


class RegisterViews(APIView):

    '''Регистрация пользователя'''

    def post(self, request):
        serializer = CustomUserCreateSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class EmailVerify(APIView):

    ''' Проверка доступности логина '''

    def post(self, request):


        data = JSONParser().parse(request)
        email = data.get('email')

        if CustomUser.objects.filter(email=email).exists():
            return Response(status=status.HTTP_201_CREATED)
        else:
            
            return Response(status=status.HTTP_200_OK)