import logging

from django.core.management import call_command
from django.db import transaction

from core.models import SiteProfile

logger = logging.getLogger(__name__)


def seed_initial_portfolio_if_empty():
    """Load fixture data when no SiteProfile exists (idempotent)."""
    if SiteProfile.objects.exists():
        return SiteProfile.objects.order_by("-updated_at").first()

    with transaction.atomic():
        if SiteProfile.objects.exists():
            return SiteProfile.objects.order_by("-updated_at").first()
        try:
            call_command("loaddata", "initial_portfolio", verbosity=0)
            logger.info("Loaded initial portfolio fixture.")
        except Exception:
            logger.exception("Failed to load initial_portfolio fixture.")
            return None

    return SiteProfile.objects.order_by("-updated_at").first()
