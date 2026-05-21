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
                "fields": ("avatar_url", "avatar", "avatar_preview"),
                "description": (
                    "Imgur: open your image → right-click → Copy image address. "
                    "Must look like https://i.imgur.com/AbC123.jpg (not imgur.com/gallery/...). "
                    "Save, then check /api/about/ — avatar must be https://i.imgur.com/...."
                ),
            },
        ),
        ("Intro video (optional)", {"fields": ("intro_video_url",)}),
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
        return bool(obj.avatar_url or obj.avatar)

    @admin.display(description="Current picture preview")
    def avatar_preview(self, obj):
        from config.serializer_utils import resolve_image_for_api

        url = resolve_image_for_api(obj, "avatar", "avatar_url", None)
        if not url:
            if obj.avatar:
                url = obj.avatar.url
            else:
                return "No image yet — add Profile picture URL or upload a file."
        return format_html(
            '<img src="{}" alt="avatar preview" style="max-height:200px;border-radius:8px;" />',
            url,
        )


