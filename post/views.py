from django.shortcuts import render

from motion_backend.permissions import IsOwnerOrReadOnly
from .models import Post
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import CreatePostSerializer, PostSerializer
from rest_framework.permissions import IsAuthenticated


class ListCreatePostView(ListCreateAPIView):
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreatePostSerializer
        return PostSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GetUpdateDeletePostView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = PostSerializer
    lookup_field = 'id'
