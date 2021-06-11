from django.urls import path
from .views import ListCreatePostView, GetUpdateDeletePostView


urlpatterns = [
    path('', ListCreatePostView.as_view()),
    path('<int:id>/', GetUpdateDeletePostView.as_view())
]