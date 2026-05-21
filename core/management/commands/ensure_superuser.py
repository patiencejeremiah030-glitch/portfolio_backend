import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = (
        "Create Django admin user from environment variables (no Render Shell). "
        "Set DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_PASSWORD, and optionally "
        "DJANGO_SUPERUSER_EMAIL on Render."
    )

    def handle(self, *args, **options):
        username = (os.getenv("DJANGO_SUPERUSER_USERNAME") or "").strip()
        email = (os.getenv("DJANGO_SUPERUSER_EMAIL") or "").strip()
        password = (os.getenv("DJANGO_SUPERUSER_PASSWORD") or "").strip()

        if not username or not password:
            self.stdout.write(
                self.style.WARNING(
                    "DJANGO_SUPERUSER_USERNAME and DJANGO_SUPERUSER_PASSWORD "
                    "are not set — skipping admin user creation."
                )
            )
            return

        User = get_user_model()
        if User.objects.filter(username=username).exists():
            self.stdout.write(
                self.style.WARNING(
                    f"Superuser '{username}' already exists — skipping."
                )
            )
            return

        User.objects.create_superuser(
            username=username,
            email=email,
            password=password,
        )
        self.stdout.write(
            self.style.SUCCESS(f"Created superuser '{username}' for Django admin.")
        )
