from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView, RetrieveAPIView, \
    GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from user.serializers import ListUserSerializer

User = get_user_model()


class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]


class MyUserList(RetrieveAPIView):
    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ToggleFollow(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        follower = request.user
        following = User.objects.get(id=kwargs["pk"])
        if follower == following:
            return Response(
                {"detail": "Users cannot do this operation with themselves."})
        else:
            if following in User.objects.filter(
                    followers=self.request.user.id):
                follower.following.remove(following)
                follower.save()
                serializer = self.get_serializer(following)
                return Response(serializer.data)
            else:
                follower.following.add(following)
                follower.save()
                serializer = self.get_serializer(following)
                return Response(serializer.data)


class FollowersList(ListAPIView):
    def get_queryset(self):
        return User.objects.filter(following=self.request.user.id)

    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]


class FollowingList(ListAPIView):
    def get_queryset(self):
        return User.objects.filter(followers=self.request.user.id)

    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]
