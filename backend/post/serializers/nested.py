from rest_framework import serializers

from backend.user.models import User


class NestedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username']


