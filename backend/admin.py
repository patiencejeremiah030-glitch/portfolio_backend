from django.contrib import admin
from django.utils.html import format_html

from config.serializer_utils import resolve_image_for_api

from .models import Skil, Experience, Education, Project


@admin.register(Skil)
class SkilAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "proficiency", "order")
    search_fields = ("name", "category", "proficiency")
    ordering = ("order",)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("company_name", "role", "start_date", "end_date", "is_current", "order")
    search_fields = ("company_name", "role")
    ordering = ("order",)
    list_filter = ("is_current",)


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "field_of_study", "start_date", "end_date", "order")
    search_fields = ("degree", "field_of_study", "school_name")
    ordering = ("order",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "has_image", "featured", "published", "created_at")
    search_fields = ("title", "description", "tech_stack")
    list_filter = ("featured", "published")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at", "image_preview")
    fieldsets = (
        (None, {"fields": ("title", "slug", "summary", "description", "tech_stack")}),
        (
            "Project image",
            {
                "fields": ("image_url", "image", "image_preview"),
                "description": (
                    "Use Project image URL with https://i.imgur.com/....jpg (same as profile). "
                    "File upload is for local dev only — it will not show on Vercel after Render redeploy."
                ),
            },
        ),
        (
            "Links & video",
            {
                "fields": (
                    "live_url",
                    "demo_video_url",
                    "demo_video",
                    "featured",
                    "published",
                ),
            },
        ),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    @admin.display(boolean=True, description="Image set?")
    def has_image(self, obj):
        return bool(obj.image_url or obj.image)

    @admin.display(description="Preview (live site uses image URL first)")
    def image_preview(self, obj):
        url = resolve_image_for_api(obj, "image", "image_url", None)
        if not url and obj.image:
            url = obj.image.url
        if not url:
            return "No image — add Project image URL (https://i.imgur.com/....jpg)."
        return format_html(
            '<img src="{}" alt="preview" style="max-height:180px;border-radius:8px;" />',
            url,
        )
