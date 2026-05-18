# Portfolio Backend

Django REST API for my portfolio site. Content is managed in Django Admin and served as JSON for a React frontend. Includes a Groq AI chat endpoint.

## Stack

Django, Django REST Framework, PostgreSQL, Groq, django-cors-headers

## Setup

1. Clone the repo and go into the folder
2. Create and activate a virtual environment
3. Run: `pip install -r requirements.txt`
4. Copy `.env.example` to `.env` and fill in your values
5. Create your PostgreSQL database
6. Run: `python manage.py migrate`
7. Run: `python manage.py createsuperuser`
8. Run: `python manage.py runserver`

Admin: http://127.0.0.1:8000/admin/  
API: http://127.0.0.1:8000/api/

## Environment variables

See `.env.example`. Do not commit `.env`.

## Main API routes

- `GET /api/about/`
- `GET /api/skils/`
- `GET /api/experiences/`
- `GET /api/educations/`
- `GET /api/projects/`
- `GET /api/blog/`
- `POST /api/contact/`
- `POST /api/chat/` — body: `{"message": "your question"}`

## Frontend

Built to work with a Vite + React app on `http://localhost:5173` (CORS enabled).
