from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from user.serializers import ListUserSerializer

User = get_user_model()


class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]


class MyUserList(ListAPIView):
    def get_queryset(self):
        user = self.request.user.id
        return User.objects.filter(id=user)

    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]
