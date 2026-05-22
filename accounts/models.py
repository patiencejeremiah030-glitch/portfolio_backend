from django.conf import settings
from django.db import models


class UserVisitStats(models.Model):
    """Tracks portfolio sign-ups and logins (visible in Django admin only)."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="visit_stats",
    )
    login_count = models.PositiveIntegerField(default=0)
    first_seen = models.DateTimeField(auto_now_add=True)
    last_seen = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "user visit stats"
        verbose_name_plural = "user visit stats"

    def __str__(self):
        return f"{self.user.username} — {self.login_count} logins"
