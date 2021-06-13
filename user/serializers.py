from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class ListUserSerializer(serializers.ModelSerializer):
    # overrides the field so that it is shown as a list
    things_user_likes = serializers.SerializerMethodField()

    def get_things_user_likes(self, obj):
        return list(obj.things_user_likes.split(", "))

    class Meta:
        model = User

        # fields when reading an instance
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "about_me",
            "location",
            "job",
            "avatar",
            "banner",
            "things_user_likes"
        ]
