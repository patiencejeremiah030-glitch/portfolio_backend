from django.shortcuts import render
from .models import SiteProfile
from .serializers import SiteProfileSerializer
from rest_framework.generics import RetrieveUpdateAPIView
# Create your views here.

class SiteProfileView(RetrieveUpdateAPIView):
    serializer_class = SiteProfileSerializer

    def get_object(self):
        return SiteProfile.objects.first()
