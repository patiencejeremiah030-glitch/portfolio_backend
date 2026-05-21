from django.core.exceptions import ValidationError
from django.db import models

from config.image_urls import normalize_external_image_url


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.TextField(max_length=255)
    content = models.TextField()
    cover_image_url = models.URLField(
        blank=True,
        verbose_name="Cover image URL",
        help_text=(
            "Direct link: https://i.imgur.com/xxxxx.jpg (right-click image → Copy image address). "
            "Best on Render for the live site."
        ),
    )
    cover_image = models.ImageField(
        upload_to="blog/",
        blank=True,
        null=True,
        verbose_name="Cover image (file upload)",
        help_text="Optional file upload. On Render, prefer Cover image URL.",
    )
    published = models.BooleanField(default=True)
    published_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs):
        if self.cover_image_url:
            self.cover_image_url = normalize_external_image_url(self.cover_image_url)
        super().save(*args, **kwargs)

    def clean(self):
        super().clean()
        if self.cover_image_url and not self.cover_image_url.startswith(
            ("http://", "https://")
        ):
            raise ValidationError(
                {
                    "cover_image_url": (
                        "Must be a full link starting with https:// "
                        "(e.g. https://i.imgur.com/cover.jpg)."
                    )
                }
            )

    def __str__(self):
        return self.title