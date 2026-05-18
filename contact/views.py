from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from .models import ContactMessage
from .serializers import ContactMessageSerializer

# Create your views here.
class ContactMessageCreateAPIView(CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer