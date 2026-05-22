"""Ensure image_url exists on Render DBs where 0003 did not run."""

from django.db import migrations, models


def add_image_url_if_missing(apps, schema_editor):
    connection = schema_editor.connection
    table = "backend_project"

    with connection.cursor() as cursor:
        try:
            description = connection.introspection.get_table_description(cursor, table)
        except Exception:
            return

    column_names = {col.name for col in description}
    if "image_url" in column_names:
        return

    Project = apps.get_model("backend", "Project")
    field = models.URLField(
        blank=True,
        help_text="Direct image link. Used if set — fixes broken uploads on Render.",
    )
    field.set_attributes_from_name("image_url")
    schema_editor.add_field(Project, field)


class Migration(migrations.Migration):

    dependencies = [
        ("backend", "0003_image_url_fields"),
    ]

    operations = [
        migrations.RunPython(add_image_url_if_missing, migrations.RunPython.noop),
    ]
