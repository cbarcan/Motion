from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

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
