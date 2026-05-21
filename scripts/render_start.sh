#!/usr/bin/env bash
set -e
echo "Running database migrations..."
python manage.py migrate --noinput
echo "Starting Gunicorn..."
exec gunicorn config.wsgi:application
