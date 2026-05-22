"""Turn Imgur page links into direct image URLs browsers can display."""

import re


def normalize_external_image_url(url: str) -> str:
    url = (url or "").strip()
    if not url.startswith(("http://", "https://")):
        return url

    # Strip query/hash (e.g. i.imgur.com/abc.jpg?1)
    base = url.split("#")[0].split("?")[0].rstrip("/")

    # https://imgur.com/AbCd123 → direct file (not /a/ or /gallery/)
    page = re.match(r"^https?://(?:www\.)?imgur\.com/([a-zA-Z0-9]+)$", base, re.I)
    if page:
        return f"https://i.imgur.com/{page.group(1)}.jpg"

    # https://i.imgur.com/AbCd123 or .../AbCd123.png
    direct = re.match(
        r"^https?://i\.imgur\.com/([a-zA-Z0-9]+)(?:\.(?:jpg|jpeg|png|gif|webp))?$",
        base,
        re.I,
    )
    if direct:
        return f"https://i.imgur.com/{direct.group(1)}.jpg"

    return url
