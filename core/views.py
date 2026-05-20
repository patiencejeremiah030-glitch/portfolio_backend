from django.conf import settings
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SiteProfile
from .serializers import SiteProfileSerializer


class HealthView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(
            {
                "status": "ok",
                "allowed_hosts": settings.ALLOWED_HOSTS,
            }
        )


class SiteProfileView(RetrieveUpdateAPIView):
    serializer_class = SiteProfileSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        profile = SiteProfile.objects.order_by("-updated_at").first()
        if profile is None:
            from rest_framework.exceptions import NotFound
            raise NotFound("No site profile configured. Add one in Django admin.")
        return profile
