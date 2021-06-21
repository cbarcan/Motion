from rest_framework.generics import CreateAPIView, ListAPIView, \
    RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from friend_request.models import FriendRequest
from friend_request.serializers import FriendRequestSerializer, \
    CreateFriendRequestSerializer
from django.db.models import Q
from django.contrib.auth import get_user_model

from motion_backend.permissions import IsOwnerOrReadOnly
from user.serializers import ListUserSerializer

User = get_user_model()


# TODO: prevent duplicate friend requests, remove kwargs


class CreateFriendRequestsView(CreateAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = CreateFriendRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        friend_id = self.kwargs['id']
        friend = User.objects.get(id=friend_id)
        serializer.save(receiver=friend, requester=self.request.user)


class ListFriendsView(ListAPIView):
    """
        This view should return a list of all the
        friends for the currently authenticated user.
    """

    def get_queryset(self):
        return self.request.user.friends

    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]


class ListMyFriendRequestsView(ListAPIView):
    """
    This view should return a list of all the incoming
    friend requests for the currently authenticated user.
    """
    def get_queryset(self):
        user = self.request.user
        return FriendRequest.objects.filter(
            Q(receiver=user) | Q(requester=user))

    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]


class RetrieveUpdateDestroyFriendRequestView(RetrieveUpdateDestroyAPIView):
    queryset = FriendRequest.objects.all()
    lookup_field = 'id'
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]
    permission_classes = [IsAuthenticated]
