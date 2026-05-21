"""Build absolute URLs for uploaded files so the Vercel frontend can load them from Render."""


def absolute_media_url(request, file_field):
    if not file_field:
        return None
    return request.build_absolute_uri(file_field.url)
