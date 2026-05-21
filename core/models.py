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
        help_text="Direct image link (Imgur, Cloudinary, etc.). Used if set — fixes Render 404s.",
    )
    avatar = models.ImageField(
        upload_to="profiles_pictures/", null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.full_name

