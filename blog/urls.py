from django.urls import path
from .views import BlogPostListAPIView, BlogPostDetailAPIView


urlpatterns = [
    path("blog/", BlogPostListAPIView.as_view(), name="blog-list"),
    path("blog/<slug:slug>/", BlogPostDetailAPIView.as_view(), name="blog-detail"),
]