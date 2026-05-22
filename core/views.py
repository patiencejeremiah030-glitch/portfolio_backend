from django.conf import settings
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SiteProfile
from .portfolio_seed import seed_initial_portfolio_if_empty
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

    def get_object(self):
        profile = seed_initial_portfolio_if_empty()
        if profile is None:
            from rest_framework.exceptions import NotFound
            raise NotFound("No site profile configured. Add one in Django admin.")
        return profile
