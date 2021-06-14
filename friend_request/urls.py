from django.urls import path

from friend_request.views import ListMyFriendsView, ListMyFriendRequestsView, CreateFriendRequestsView

urlpatterns = [
    path('', ListMyFriendsView.as_view()),
    path('requests/', ListMyFriendRequestsView.as_view()),
    path('request/<int:id>/', CreateFriendRequestsView.as_view()),
]
