from django.contrib import admin
from django.utils.html import format_html

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
    list_display = (
        "title",
        "image_url_short",
        "live_url_short",
        "featured",
        "published",
        "created_at",
    )
    search_fields = ("title", "description", "tech_stack", "image_url")
    list_filter = ("featured", "published")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = (
        "created_at",
        "updated_at",
        "image_url_help",
        "image_preview",
    )
    fieldsets = (
        (None, {"fields": ("title", "slug", "summary", "description", "tech_stack")}),
        (
            "Project URLs",
            {
                "description": (
                    "Paste links from Imgur, GitHub, or your live demo. "
                    "On Render, use Image URL (Imgur) — file uploads are not kept after redeploy."
                ),
                "fields": (
                    "image_url_help",
                    "image_url",
                    "image_preview",
                    "live_url",
                    "demo_video_url",
                ),
            },
        ),
        (
            "Optional file upload (local dev only)",
            {
                "classes": ("collapse",),
                "fields": ("image", "demo_video"),
            },
        ),
        ("Publish", {"fields": ("featured", "published")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    @admin.display(description="Image URL")
    def image_url_short(self, obj):
        if not obj.image_url:
            return "—"
        url = obj.image_url
        return url[:48] + "…" if len(url) > 48 else url

    @admin.display(description="Live URL")
    def live_url_short(self, obj):
        if not obj.live_url:
            return "—"
        url = obj.live_url
        return url[:40] + "…" if len(url) > 40 else url

    @admin.display(description="How to add an Imgur image")
    def image_url_help(self, obj=None):
        return format_html(
            "<ol style='margin:0;padding-left:1.2rem;line-height:1.6;'>"
            "<li>Upload your screenshot to <a href='https://imgur.com/upload' target='_blank' rel='noopener'>imgur.com</a></li>"
            "<li>Open the image → right-click → <strong>Copy image address</strong></li>"
            "<li>Paste here, e.g. <code>https://i.imgur.com/abc123.jpg</code></li>"
            "<li>Or paste the Imgur page link — it is converted automatically on save</li>"
            "</ol>"
        )

    @admin.display(description="Preview (from Image URL)")
    def image_preview(self, obj=None):
        if obj is None:
            return "Paste an Image URL above, then save to see a preview."

        url = (obj.image_url or "").strip()
        if url:
            return format_html(
                '<img src="{}" alt="preview" style="max-height:200px;border-radius:8px;" />'
                '<p style="margin-top:8px;color:#64748b;font-size:12px;">If the preview is broken, '
                "use <strong>Copy image address</strong> from Imgur (https://i.imgur.com/….jpg).</p>",
                url,
            )

        if obj.image:
            try:
                file_url = obj.image.url
            except (ValueError, OSError):
                return (
                    "Uploaded file is missing on disk (common on Render). "
                    "Use Image URL with an Imgur link instead."
                )
            return format_html(
                '<img src="{}" alt="uploaded file" style="max-height:200px;border-radius:8px;" />'
                "<p style='margin-top:8px;color:#64748b;font-size:12px;'>"
                "Uploaded file — on Render, also set <strong>Image URL</strong> above."
                "</p>",
                file_url,
            )

        return "No image yet — paste an Imgur link in Image URL above."

    def save_model(self, request, obj, form, change):
        if obj.image_url:
            from config.image_urls import normalize_external_image_url

            obj.image_url = normalize_external_image_url(obj.image_url.strip())
        super().save_model(request, obj, form, change)
