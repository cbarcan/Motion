from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.db import models

User = get_user_model()


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']


class ValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'email',
            'username',
        ]
