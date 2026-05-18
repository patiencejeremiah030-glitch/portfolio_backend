from rest_framework import serializers
from .models import SiteProfile

class SiteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteProfile
        fields = "__all__"
