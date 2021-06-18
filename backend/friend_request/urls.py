from django.urls import path

from backend.friend_request.views import ListMyFriendsView, ListMyFriendRequestsView, \
    CreateFriendRequestsView, RetrieveUpdateDestroyFriendRequestView

urlpatterns = [
    path('', ListMyFriendsView.as_view()),
    path('requests/', ListMyFriendRequestsView.as_view()),
    path('requests/<int:id>/', RetrieveUpdateDestroyFriendRequestView.as_view()),
    path('request/<int:id>/', CreateFriendRequestsView.as_view()),
]
