from django.shortcuts import render
from .models import BlogPost
from .serializers import BlogPostSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView

# Create your views here.
class BlogPostListAPIView(ListAPIView):
    queryset = BlogPost.objects.filter(published=True).order_by("-published_at")
    serializer_class = BlogPostSerializer
 
class BlogPostDetailAPIView(RetrieveAPIView):
    queryset = BlogPost.objects.filter(published=True)
    serializer_class = BlogPostSerializer
    lookup_field = "slug"