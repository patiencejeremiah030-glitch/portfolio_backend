from django.contrib import admin, messages
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import UserVisitStats

User = get_user_model()


class UserVisitStatsInline(admin.StackedInline):
    model = UserVisitStats
    can_delete = False
    extra = 0
    readonly_fields = ("login_count", "first_seen", "last_seen")
    fields = ("login_count", "first_seen", "last_seen")


@admin.register(UserVisitStats)
class UserVisitStatsAdmin(admin.ModelAdmin):
    list_display = ("user", "login_count", "first_seen", "last_seen")
    list_filter = ("first_seen", "last_seen")
    search_fields = ("user__username", "user__email")
    readonly_fields = ("user", "login_count", "first_seen", "last_seen")
    ordering = ("-last_seen",)

    def has_add_permission(self, request):
        return False


if admin.site.is_registered(User):
    admin.site.unregister(User)


@admin.register(User)
class PortfolioUserAdmin(BaseUserAdmin):
    """Site visitors who signed up — not the same as your admin login."""

    inlines = [UserVisitStatsInline]
    list_display = (
        "username",
        "email",
        "is_staff",
        "date_joined",
        "last_login",
        "portfolio_logins",
        "portfolio_last_seen",
    )
    list_filter = ("is_staff", "is_superuser", "is_active", "date_joined")
    ordering = ("-date_joined",)

    @admin.display(description="Portfolio logins")
    def portfolio_logins(self, obj):
        if hasattr(obj, "visit_stats"):
            return obj.visit_stats.login_count
        return "—"

    @admin.display(description="Last active")
    def portfolio_last_seen(self, obj):
        if hasattr(obj, "visit_stats"):
            return obj.visit_stats.last_seen
        return "—"

    def changelist_view(self, request, extra_context=None):
        qs = User.objects.filter(is_staff=False, is_superuser=False)
        total = qs.count()
        messages.info(
            request,
            f"Portfolio visitors: {total} registered user(s). "
            "Staff/admin accounts are excluded. "
            "Columns: Portfolio logins = sign-up + logins; Last active = latest visit.",
        )
        return super().changelist_view(request, extra_context=extra_context)
