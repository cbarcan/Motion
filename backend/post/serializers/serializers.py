from rest_framework import serializers

from backend.post.models import Post
from backend.post.serializers.nested import NestedUserSerializer


class CreatePostSerializer(serializers.ModelSerializer):
    # user = NestedUserSerializer()

    class Meta:
        model = Post
        fields = '__all__'
        read_only_field = ['user']


class PostSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer()
    liked = NestedUserSerializer(many=True)

    class Meta:
        model = Post
        fields = '__all__'
