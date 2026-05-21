"""Build absolute URLs for uploaded files so the Vercel frontend can load them from Render."""


def absolute_media_url(request, file_field):
    if not file_field:
        return None
    url = file_field.url
    if url.startswith(("http://", "https://")):
        return url
    return request.build_absolute_uri(url)


def resolve_image_for_api(instance, file_attr, url_attr, request):
    """
    Prefer a pasted image URL (works without Cloudinary), then uploaded file.
    Returned value is what the API exposes as avatar / image for the frontend.
    """
    external = (getattr(instance, url_attr, None) or "").strip()
    if external:
        return external

    file_field = getattr(instance, file_attr, None)
    if not file_field:
        return None

    if request:
        return absolute_media_url(request, file_field)

    url = file_field.url
    if url.startswith(("http://", "https://")):
        return url
    return url
