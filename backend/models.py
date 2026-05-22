from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models

from config.image_urls import normalize_external_image_url

# ~60s 720p MP4 is often under 30MB.
MAX_DEMO_VIDEO_BYTES = 60 * 1024 * 1024


def validate_demo_video_size(value):
    if value.size > MAX_DEMO_VIDEO_BYTES:
        raise ValidationError(
            "Demo video must be 60 MB or less (about 1 minute at 720p). "
            "Use a YouTube link instead for longer clips."
        )


# Create your models here.
class Skil(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    proficiency = models.IntegerField()
    order = models.PositiveIntegerField(default=0)


    def __str__(self):
        return self.name

class Experience(models.Model):
    company_name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.role} - {self.company_name}"

class Education(models.Model):
    school_name = models.CharField(max_length=150)
    degree = models.CharField(max_length=150)
    field_of_study = models.CharField(max_length=150, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.degree} - {self.school_name}"

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    summary = models.TextField(max_length=255)
    description = models.TextField()
    tech_stack = models.CharField(max_length=255, )
    live_url = models.URLField(blank=True)
    image_url = models.URLField(
        blank=True,
        verbose_name="Project image URL",
        help_text=(
            "Direct link: https://i.imgur.com/xxxxx.jpg (right-click image → Copy image address). "
            "Required on Render — file upload alone will not show on the live site."
        ),
    )
    image = models.ImageField(upload_to="projects_pictures/", blank=True, null=True)
    demo_video_url = models.URLField(
        blank=True,
        help_text="YouTube or Vimeo link (recommended, free). Short demo, about 60 seconds.",
    )
    demo_video = models.FileField(
        upload_to="project_videos/",
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=["mp4", "webm", "mov"]),
            validate_demo_video_size,
        ],
        help_text="Optional MP4/WebM/MOV upload (max 60 MB). YouTube URL is recommended on Render.",
    )
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs):
        if self.image_url:
            self.image_url = normalize_external_image_url(self.image_url.strip())
        super().save(*args, **kwargs)

    def clean(self):
        super().clean()
        url = (self.image_url or "").strip()
        if not url:
            return
        if not url.startswith(("http://", "https://")):
            raise ValidationError(
                {
                    "image_url": (
                        "Must be a full link starting with https:// "
                        "(e.g. https://i.imgur.com/screenshot.jpg)."
                    )
                }
            )
        self.image_url = normalize_external_image_url(url)

    def __str__(self):
        return self.title

