from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Skil, Experience, Education, Project
from .serializers import (
    SkilSerializer,
    ExperienceSerializer,
    EducationSerializer,
    ProjectSerializer,
)


class SkilListAPIView(ListAPIView):
    queryset = Skil.objects.all().order_by("order", "name")
    serializer_class = SkilSerializer


class ExperienceListAPIView(ListAPIView):
    queryset = Experience.objects.all().order_by("order", "-start_date")
    serializer_class = ExperienceSerializer


class EducationListAPIView(ListAPIView):
    queryset = Education.objects.all().order_by("order", "-start_date")
    serializer_class = EducationSerializer


class ProjectListAPIView(ListAPIView):
    queryset = Project.objects.filter(published=True).order_by("-created_at")
    serializer_class = ProjectSerializer


class ProjectDetailAPIView(RetrieveAPIView):
    queryset = Project.objects.filter(published=True)
    serializer_class = ProjectSerializer
    lookup_field = "slug"
