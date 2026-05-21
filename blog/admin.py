from django.contrib import admin
from django.utils.html import format_html

from config.serializer_utils import resolve_image_for_api

from .models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "has_cover", "published", "published_at", "created_at")
    search_fields = ("title", "excerpt", "content")
    list_filter = ("published",)
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at", "cover_preview")
    fieldsets = (
        (None, {"fields": ("title", "slug", "excerpt", "content")}),
        (
            "Cover image",
            {
                "fields": ("cover_image_url", "cover_image", "cover_preview"),
                "description": (
                    "Use Cover image URL with https://i.imgur.com/....jpg for the live site. "
                    "File upload works locally."
                ),
            },
        ),
        ("Publish", {"fields": ("published", "published_at")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    @admin.display(boolean=True, description="Cover set?")
    def has_cover(self, obj):
        return bool(obj.cover_image_url or obj.cover_image)

    @admin.display(description="Preview")
    def cover_preview(self, obj):
        url = resolve_image_for_api(obj, "cover_image", "cover_image_url", None)
        if not url and obj.cover_image:
            url = obj.cover_image.url
        if not url:
            return "No cover — add Cover image URL (https://i.imgur.com/....jpg)."
        return format_html(
            '<img src="{}" alt="cover preview" style="max-height:180px;border-radius:8px;" />',
            url,
        )
