from rest_framework import serializers

from config.serializer_utils import absolute_media_url

from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        if instance.cover_image:
            data["cover_image"] = absolute_media_url(
                request, instance.cover_image
            )
        return data
