from django.contrib import admin
from django.utils.html import format_html

from .models import SiteProfile


@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "location", "has_profile_image", "updated_at")
    search_fields = ("full_name", "email", "location")
    readonly_fields = ("created_at", "updated_at", "avatar_preview")
    fieldsets = (
        (None, {"fields": ("full_name", "headline", "bio")}),
        (
            "Profile picture",
            {
                "fields": ("avatar", "avatar_preview"),
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

    @admin.display(boolean=True, description="Image set?")
    def has_profile_image(self, obj):
        return bool(obj.avatar)

    @admin.display(description="Preview")
    def avatar_preview(self, obj):
        if not obj.avatar:
            return "No image — upload a profile picture below."
        url = obj.avatar.url
        if url.startswith(("http://", "https://")):
            src = url
        else:
            src = url
        return format_html(
            '<img src="{}" alt="avatar preview" style="max-height:200px;border-radius:8px;" />',
            src,
        )
