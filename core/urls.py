from django.urls import path
from .views import HealthView, SiteProfileView

urlpatterns = [
    path("health/", HealthView.as_view(), name="health"),
    path("about/", SiteProfileView.as_view(), name="about"),
]