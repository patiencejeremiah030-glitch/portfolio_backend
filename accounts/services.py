from django.utils import timezone

from .models import UserVisitStats


def record_user_visit(user, *, is_login=False):
    """Create or update stats when a visitor registers, logs in, or loads /auth/me/."""
    stats, created = UserVisitStats.objects.get_or_create(user=user)
    stats.last_seen = timezone.now()
    update_fields = ["last_seen"]
    if is_login or created:
        stats.login_count += 1
        update_fields.append("login_count")
    stats.save(update_fields=update_fields)
    return stats
