from django.urls import path

from friend_request.views import ListMyFriendsView, ListMyFriendRequestsView

urlpatterns = [
    path('', ListMyFriendsView.as_view()),
    path('requests/', ListMyFriendRequestsView.as_view()),
]
