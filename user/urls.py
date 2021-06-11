from django.urls import path

from user.views import UserList

urlpatterns = [
    path(
        '',
        UserList.as_view()
    ),
]
