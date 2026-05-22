from django.contrib import admin
from django.utils.html import escape
from django.utils.safestring import mark_safe

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
    list_display = ("school_name", "degree", "field_of_study", "start_date", "end_date", "order")
    search_fields = ("degree", "field_of_study", "school_name")
    ordering = ("order",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "featured", "published", "created_at")
    search_fields = ("title", "description", "tech_stack")
    list_filter = ("featured", "published")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at", "image_preview")
    fieldsets = (
        (None, {"fields": ("title", "slug", "summary", "description", "tech_stack")}),
        (
            "Project URLs (use Imgur image link on Render)",
            {
                "fields": (
                    "image_url",
                    "image_preview",
                    "live_url",
                    "demo_video_url",
                ),
            },
        ),
        (
            "Optional uploads (local dev only — not kept on Render)",
            {
                "classes": ("collapse",),
                "fields": ("image", "demo_video"),
            },
        ),
        ("Publish", {"fields": ("featured", "published")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    @admin.display(description="Image preview")
    def image_preview(self, obj=None):
        if obj is None or not getattr(obj, "pk", None):
            return "Save the project first, then add an Image URL and save again."

        url = (getattr(obj, "image_url", None) or "").strip()
        if url:
            safe_url = escape(url)
            return mark_safe(
                f'<img src="{safe_url}" alt="preview" style="max-height:200px;border-radius:8px;" />'
                '<p style="margin-top:8px;font-size:12px;color:#64748b;">'
                "Use https://i.imgur.com/….jpg (Copy image address from Imgur).</p>"
            )

        return "No Image URL yet. Paste https://i.imgur.com/your-id.jpg in the field above."

    def save_model(self, request, obj, form, change):
        if getattr(obj, "image_url", None):
            from config.image_urls import normalize_external_image_url

            obj.image_url = normalize_external_image_url(obj.image_url.strip())

        # Broken file reference on Render causes 500 on save — clear missing uploads
        if obj.image and not obj.image.name:
            obj.image = None
        elif obj.image:
            try:
                if not obj.image.storage.exists(obj.image.name):
                    obj.image = None
            except Exception:
                obj.image = None

        super().save_model(request, obj, form, change)
