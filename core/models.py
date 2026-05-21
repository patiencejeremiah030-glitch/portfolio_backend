from django.core.exceptions import ValidationError
from django.db import models

# Create your models here.
class SiteProfile(models.Model):
    full_name = models.CharField(max_length=100)
    headline = models.CharField(max_length=100)
    bio = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    resume_url = models.URLField(blank=True)
    intro_video_url = models.URLField(
        blank=True,
        help_text="YouTube/Vimeo link to a short intro about you (about 60 seconds).",
    )
    avatar_url = models.URLField(
        blank=True,
        verbose_name="Profile picture URL",
        help_text=(
            "Use a DIRECT image link: https://i.imgur.com/xxxxx.jpg "
            "(right-click image on Imgur → Copy image address). "
            "Page links like https://imgur.com/xxxxx are auto-fixed when possible."
        ),
    )
    avatar = models.ImageField(
        upload_to="profiles_pictures/",
        null=True,
        blank=True,
        verbose_name="Profile picture (file upload)",
        help_text="Upload from your computer. Works locally; on Render prefer Profile picture URL above.",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs):
        if self.avatar_url:
            from config.image_urls import normalize_external_image_url

            self.avatar_url = normalize_external_image_url(self.avatar_url)
        super().save(*args, **kwargs)

    def clean(self):
        super().clean()
        if self.avatar_url and not self.avatar_url.startswith(("http://", "https://")):
            raise ValidationError(
                {
                    "avatar_url": (
                        "Must be a full link starting with https:// "
                        "(e.g. https://i.imgur.com/yourphoto.jpg). "
                        "A filename alone will not work on the live site."
                    )
                }
            )

    def __str__(self):
        return self.full_name

