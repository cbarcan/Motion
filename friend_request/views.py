from rest_framework.generics import CreateAPIView, ListAPIView
from friend_request.models import FriendRequest
from friend_request.serializers import FriendRequestSerializer, CreateFriendRequestSerializer
from django.db.models import Q
from django.contrib.auth import get_user_model

User = get_user_model()


class CreateFriendRequestsView(CreateAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = CreateFriendRequestSerializer

    def perform_create(self, serializer):
        friend_id = self.kwargs['id']
        friend = User.objects.get(id=friend_id)
        serializer.save(receiver=friend, requester=self.request.user)


class ListMyFriendsView(ListAPIView):
    def get_queryset(self):
        """
        This view should return a list of all the
        friends for the currently authenticated user.
        """
        user = self.request.user
        return FriendRequest.objects.filter(Q(receiver=user) | Q(requester=user), status='A')

    serializer_class = FriendRequestSerializer


class ListMyFriendRequestsView(ListAPIView):

    def get_queryset(self):
        """
        This view should return a list of all the incoming
        friend requests for the currently authenticated user.
        """
        user = self.request.user
        return FriendRequest.objects.filter(Q(receiver=user) | Q(requester=user))

    serializer_class = FriendRequestSerializer


class ListFriendRequestView(ListAPIView):

    def get_queryset(self):
        """
        This view should return a friend request by id.
        """
        request_id = self.kwargs['id']
        return FriendRequest.objects.filter(id=request_id)

    serializer_class = FriendRequestSerializer


