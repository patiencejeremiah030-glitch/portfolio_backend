from django.core.management import call_command
from django.core.management.base import BaseCommand

from core.models import SiteProfile


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

        call_command("loaddata", "initial_portfolio", verbosity=options["verbosity"])
        self.stdout.write(
            self.style.SUCCESS(
                "Loaded initial portfolio data (profile, skills, projects, blog)."
            )
        )
