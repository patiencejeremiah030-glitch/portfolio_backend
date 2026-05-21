"""Turn Imgur page links into direct image URLs browsers can display."""

import re


def normalize_external_image_url(url: str) -> str:
    url = (url or "").strip()
    if not url.startswith(("http://", "https://")):
        return url

    # https://imgur.com/AbCd123 → direct file
    page = re.match(r"^https?://(?:www\.)?imgur\.com/([a-zA-Z0-9]+)/?$", url, re.I)
    if page:
        return f"https://i.imgur.com/{page.group(1)}.jpg"

    # https://i.imgur.com/AbCd123 (no extension)
    direct = re.match(r"^https?://i\.imgur\.com/([a-zA-Z0-9]+)/?$", url, re.I)
    if direct:
        return f"https://i.imgur.com/{direct.group(1)}.jpg"

    return url
