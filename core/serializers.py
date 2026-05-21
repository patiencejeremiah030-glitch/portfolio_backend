from rest_framework import serializers

from config.serializer_utils import absolute_media_url

from .models import SiteProfile


class SiteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteProfile
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        if request and instance.avatar:
            data["avatar"] = absolute_media_url(request, instance.avatar)
        return data
