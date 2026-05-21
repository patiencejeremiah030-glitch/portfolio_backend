from rest_framework import serializers

from config.serializer_utils import absolute_media_url, resolve_image_for_api

from .models import Skil, Experience, Education, Project

class SkilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skil
        fields = "__all__"

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        data["image"] = resolve_image_for_api(instance, "image", "image_url", request)
        if request and instance.demo_video:
            data["demo_video"] = absolute_media_url(request, instance.demo_video)
        return data