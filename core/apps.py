from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"

    def ready(self):
        from django.db.models.signals import post_migrate

        from core.portfolio_seed import seed_initial_portfolio_if_empty

        def load_fixture_after_migrate(sender, **kwargs):
            if sender.name != "core":
                return
            seed_initial_portfolio_if_empty()

        post_migrate.connect(
            load_fixture_after_migrate,
            dispatch_uid="core_seed_initial_portfolio",
        )
