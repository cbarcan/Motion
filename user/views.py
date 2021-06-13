from django.contrib.auth import get_user_model
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAdminUser
from user.serializers import ListUserSerializer

User = get_user_model()


class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = ListUserSerializer
    permission_classes = [IsAdminUser]
