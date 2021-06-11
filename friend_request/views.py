from rest_framework.generics import ListCreateAPIView
from friend_request.models import FriendRequest
from friend_request.serializers import FriendRequestSerializer, CreateFriendRequestSerializer


class ListCreateFriendRequestsView(ListCreateAPIView):
    queryset = FriendRequest.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateFriendRequestSerializer
        return FriendRequestSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

