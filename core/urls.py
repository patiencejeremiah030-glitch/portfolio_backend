from django.urls import path
from .views import SiteProfileView

urlpatterns = [
    path("about/", SiteProfileView.as_view(), name="about"),
]