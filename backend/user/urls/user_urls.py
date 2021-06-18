from django.urls import path

from backend.user.views import UserList, MyUserList

urlpatterns = [
    path(
        '',
        UserList.as_view()
    ),
    path(
        'me/',
        MyUserList.as_view()
    ),
]
