from django.urls import path
from .views import(
    SkilListAPIView,
    ExperienceListAPIView,
    EducationListAPIView,
    ProjectListAPIView,
)

urlpatterns = [
    path("skils/", SkilListAPIView.as_view(), name="skil-list"),
    path("experiences/", ExperienceListAPIView.as_view(), name="experience"),
    path("educations/", EducationListAPIView.as_view(), name="education"),
    path("projects/", ProjectListAPIView.as_view(), name="project"),
    path("projects/<slug:slug>/", ProjectListAPIView.as_view(), name="project-detail"),
]