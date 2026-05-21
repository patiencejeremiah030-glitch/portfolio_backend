from django.contrib import admin
from .models import Skil, Experience, Education, Project
# Register your models here.

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
    list_display = ( "degree", "field_of_study", "start_date", "end_date", "order")
    search_fields = ( "degree", "field_of_study", "school_name")
    ordering = ("order",)
    

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "featured", "published", "created_at")
    search_fields = ("title", "description", "tech_stack")
    list_filter = ("featured", "published", )
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (None, {"fields": ("title", "slug", "summary", "description", "tech_stack")}),
        (
            "Links & media",
            {
                "fields": (
                    "live_url",
                    "image_url",
                    "image",
                    "demo_video_url",
                    "demo_video",
                    "featured",
                    "published",
                ),
                "description": (
                    "For short demos (~60s): paste a YouTube link in demo video URL (free), "
                    "or upload MP4/WebM/MOV (max 60 MB) if Cloudinary is configured."
                ),
            },
        ),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

