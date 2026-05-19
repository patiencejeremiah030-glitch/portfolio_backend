"""Build live portfolio context from the database for the AI assistant."""

from core.models import SiteProfile
from backend.models import Skil, Experience, Education, Project


def _line(label, value):
    if value is None or value == "":
        return None
    return f"{label}: {value}"


def build_portfolio_context():
    profile = SiteProfile.objects.order_by("-updated_at").first()
    if not profile:
        return (
            "You are a portfolio assistant. No profile is configured in the admin yet. "
            "Tell the visitor to check back later or use the contact page."
        )

    sections = [
        "You are the portfolio AI assistant. Answer ONLY using the facts below about this developer. "
        "If something is not listed, say you do not have that information. "
        "Keep answers short, friendly, and accurate. Do not invent projects or employers.",
        "",
        "=== PROFILE ===",
        _line("Name", profile.full_name),
        _line("Headline", profile.headline),
        _line("Bio", profile.bio),
        _line("Email", profile.email),
        _line("Phone", profile.phone),
        _line("Location", profile.location),
        _line("GitHub", profile.github_url),
        _line("LinkedIn", profile.linkedin_url),
        _line("YouTube", profile.youtube_url),
        _line("Twitter", profile.twitter_url),
        _line("Instagram", profile.instagram_url),
        _line("Resume", profile.resume_url),
    ]

    skills = Skil.objects.all().order_by("order", "name")
    if skills.exists():
        sections.append("")
        sections.append("=== SKILLS ===")
        for s in skills:
            sections.append(f"- {s.name} ({s.category}, proficiency {s.proficiency}/5)")

    projects = Project.objects.filter(published=True).order_by("-created_at")
    if projects.exists():
        sections.append("")
        sections.append("=== PROJECTS ===")
        for p in projects:
            sections.append(f"- {p.title}: {p.summary}")
            if p.tech_stack:
                sections.append(f"  Tech: {p.tech_stack}")
            if p.live_url:
                sections.append(f"  Live: {p.live_url}")

    experiences = Experience.objects.all().order_by("order", "-start_date")
    if experiences.exists():
        sections.append("")
        sections.append("=== EXPERIENCE ===")
        for e in experiences:
            end = "Present" if e.is_current else str(e.end_date or "")
            sections.append(f"- {e.role} at {e.company_name} ({e.start_date} – {end})")
            if e.description:
                sections.append(f"  {e.description[:400]}")

    educations = Education.objects.all().order_by("order", "-start_date")
    if educations.exists():
        sections.append("")
        sections.append("=== EDUCATION ===")
        for ed in educations:
            sections.append(f"- {ed.degree} at {ed.school_name}")
            if ed.field_of_study:
                sections.append(f"  Field: {ed.field_of_study}")

    return "\n".join(line for line in sections if line is not None)
