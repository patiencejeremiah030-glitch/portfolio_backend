from .models import SiteProfile
from .serializers import SiteProfileSerializer
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny


class SiteProfileView(RetrieveUpdateAPIView):
    serializer_class = SiteProfileSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        profile = SiteProfile.objects.order_by("-updated_at").first()
        if profile is None:
            from rest_framework.exceptions import NotFound
            raise NotFound("No site profile configured. Add one in Django admin.")
        return profile
