from django.contrib import admin
from .models import SiteProfile

# Register your models here.
@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "created_at", "email", "location")
    search_fields = ("full_name", "email", "location")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "full_name",
                    "headline",
                    "bio",
                    "avatar_url",
                    "avatar",
                    "intro_video_url",
                ),
                "description": (
                    "On Render: paste a public image link in Avatar url (recommended). "
                    "File upload only works until the next redeploy."
                ),
            },
        ),
        (
            "Contact & links",
            {
                "fields": (
                    "email",
                    "phone",
                    "location",
                    "github_url",
                    "linkedin_url",
                    "youtube_url",
                    "twitter_url",
                    "instagram_url",
                    "resume_url",
                ),
            },
        ),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )


