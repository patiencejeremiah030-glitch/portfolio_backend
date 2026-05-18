from django.contrib import admin
from .models import ContactMessage

# Register your models here.
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "message", "handled", "created_at")
    search_fields = ("name", "email", "subject", "message")
    list_filter = ("handled", "created_at")
    readonly_fields = ("created_at", )
