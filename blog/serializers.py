from rest_framework import serializers

from config.serializer_utils import resolve_image_for_api

from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        data["cover_image"] = resolve_image_for_api(
            instance, "cover_image", "cover_image_url", request
        )
        return data
        