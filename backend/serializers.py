from rest_framework import serializers
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