from rest_framework import serializers
from friend_request.models import FriendRequest
from django.contrib.auth import get_user_model

User = get_user_model()


class CreateFriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'

