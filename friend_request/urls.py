from django.urls import path

from friend_request.views import ListCreateFriendRequestsView

urlpatterns = [
    path('', ListCreateFriendRequestsView.as_view()),
]
