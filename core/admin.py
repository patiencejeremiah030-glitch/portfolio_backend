from django.contrib import admin
from .models import SiteProfile

# Register your models here.
@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "created_at", "email", "location")
    search_fields = ("full_name", "email",  "location")
    readonly_fields = ("created_at", "updated_at")


