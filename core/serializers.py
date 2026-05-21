from rest_framework import serializers

from config.serializer_utils import resolve_image_for_api

from .models import SiteProfile


class SiteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteProfile
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        data["avatar"] = resolve_image_for_api(
            instance, "avatar", "avatar_url", request
        )
        return data
