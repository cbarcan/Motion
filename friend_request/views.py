from rest_framework.generics import ListCreateAPIView, ListAPIView
from friend_request.models import FriendRequest
from friend_request.serializers import FriendRequestSerializer, CreateFriendRequestSerializer
from django.db.models import Q


class ListCreateFriendRequestsView(ListCreateAPIView):
    queryset = FriendRequest.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateFriendRequestSerializer
        return FriendRequestSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ListMyFriendsView(ListCreateAPIView):
    def get_queryset(self):
        """
        This view should return a list of all the incoming
        friend requests for the currently authenticated user.
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


