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
                "fields": ("image", "image_preview"),
            },
        ),
        (
            "Publish",
            {
                "fields": ("featured", "published"),
            },
        ),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    @admin.display(boolean=True, description="Image set?")
    def has_image(self, obj):
        return bool(obj.image)

    @admin.display(description="Preview")
    def image_preview(self, obj):
        if not obj.image:
            return "No image — upload a project image below."
        return format_html(
            '<img src="{}" alt="preview" style="max-height:180px;border-radius:8px;" />',
            obj.image.url,
        )
