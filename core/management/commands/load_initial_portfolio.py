from django.core.management.base import BaseCommand

from core.models import SiteProfile
from core.portfolio_seed import seed_initial_portfolio_if_empty


class Command(BaseCommand):
    help = (
        "Load initial portfolio content from core/fixtures/initial_portfolio.json "
        "when no SiteProfile exists (e.g. fresh Render Postgres)."
    )

    def handle(self, *args, **options):
        if SiteProfile.objects.exists():
            self.stdout.write(
                self.style.WARNING(
                    "Site profile already exists — skipping initial data load."
                )
            )
            return

        profile = seed_initial_portfolio_if_empty()
        if profile:
            self.stdout.write(
                self.style.SUCCESS(
                    "Loaded initial portfolio data (profile, skills, projects, blog)."
                )
            )
        else:
            self.stdout.write(
                self.style.ERROR(
                    "Could not load initial portfolio data. Check fixture file."
                )
            )
