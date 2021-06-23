from django.urls import path

from registration.views import RegistrationView, ValidationView

urlpatterns = [
    path(
        'registration/',
        RegistrationView.as_view()
    ),
    path(
        'registration/validation/',
        ValidationView.as_view()
    ),
]
