from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class ListUserSerializer(serializers.ModelSerializer):
    # overrides the field so that it is shown as a list
    things_user_likes = serializers.SerializerMethodField()
    logged_in_user_is_following = serializers.SerializerMethodField()

    def get_things_user_likes(self, obj):
        if obj.things_user_likes:
            return list(obj.things_user_likes.split(", "))
        else:
            return []

    def get_logged_in_user_is_following(self, obj):
        if obj in User.objects.filter(
                followers=self.context["request"].user.id):
            return True
        else:
            return False

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
            "things_user_likes",
            "logged_in_user_is_following",
            # "followers",
            # "following"
        ]
