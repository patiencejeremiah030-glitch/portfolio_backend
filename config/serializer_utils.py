"""Build absolute https URLs for images so the Vercel frontend can load them."""

import os

from django.conf import settings

from config.image_urls import normalize_external_image_url


def get_api_public_base(request=None):
    """Public base URL of this API (no /api suffix)."""
    explicit = (os.getenv("PUBLIC_API_BASE_URL") or "").strip().rstrip("/")
    if explicit:
        return explicit

    if request:
        return request.build_absolute_uri("/").rstrip("/")

    render_host = (os.getenv("RENDER_EXTERNAL_HOSTNAME") or "").strip()
    if render_host:
        return f"https://{render_host}"

    return "http://127.0.0.1:8000"


def absolute_media_url(request, file_field):
    if not file_field:
        return None

    url = (file_field.url or "").strip()
    if not url:
        return None

    if url.startswith(("http://", "https://")):
        return url

    base = get_api_public_base(request)
    if not url.startswith("/"):
        url = f"{settings.MEDIA_URL.rstrip('/')}/{url.lstrip('/')}"

    return f"{base.rstrip('/')}{url}"


def resolve_image_for_api(instance, file_attr, url_attr, request):
    """
    Prefer Profile picture URL (must be https://...).
    Otherwise turn uploaded file path into a full https://... URL.
    """
    external = (getattr(instance, url_attr, None) or "").strip()
    if external:
        if external.startswith(("http://", "https://")):
            return normalize_external_image_url(external)
        # Not a valid public URL — ignore so we don't send a bare filename to the frontend
        external = ""

    file_field = getattr(instance, file_attr, None)
    if not file_field:
        return None

    return absolute_media_url(request, file_field)
