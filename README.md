# AUDREY Portfolio (Full Stack)

Personal portfolio with a **Django REST API** backend and a **React (Vite)** frontend. Content is managed in Django Admin and consumed by the web app. Includes a Groq-powered AI chat assistant.

## Stack

| Layer | Technologies |
|-------|----------------|
| **Backend** | Django, Django REST Framework, SQLite (local) / PostgreSQL (production), Groq, django-cors-headers |
| **Frontend** | React, Vite, Chakra UI, Framer Motion, React Router, Axios |

## Project structure

```
portfolio-Backend/
├── config/              # Django settings & URLs
├── core/                # Site profile (about)
├── backend/             # Skills, experience, education, projects
├── blog/                # Blog posts
├── contact/             # Contact form submissions
├── chatbot/             # AI chat (Groq)
├── frontend/            # React app (Vite)
├── manage.py
├── requirements.txt
├── .env.example         # Backend environment template
└── frontend/.env.example
```

## Prerequisites

- **Python 3.11+**
- **Node.js 18+** and npm
- **Groq API key** (for AI chat)
- **PostgreSQL** (optional locally; set `USE_POSTGRES=true` in `.env`)

---

## Backend setup

1. Clone the repo and open the project folder:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd portfolio-Backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   # Windows (PowerShell)
   .venv\Scripts\Activate.ps1
   # macOS / Linux
   source .venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Copy environment file and edit values:
   ```bash
   cp .env.example .env
   ```
   See [Backend environment variables](#backend-environment-variables) below.

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Create an admin user:
   ```bash
   python manage.py createsuperuser
   ```

7. Start the API server:
   ```bash
   python manage.py runserver
   ```

- **Admin:** http://127.0.0.1:8000/admin/  
- **API base:** http://127.0.0.1:8000/api/

Add your profile, projects, skills, and other content in Django Admin.

---

## Frontend setup

1. Go to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment file:
   ```bash
   cp .env.example .env
   ```
   Set `VITE_API_URL` to your backend (see [Frontend environment variables](#frontend-environment-variables)).

4. Start the dev server:
   ```bash
   npm run dev
   ```

- **Site:** http://localhost:5173/

---

## Run locally (both servers)

Use two terminals:

| Terminal | Directory | Command |
|----------|-----------|---------|
| 1 — API | Project root | `python manage.py runserver` |
| 2 — UI | `frontend/` | `npm run dev` |

Open http://localhost:5173 in your browser. CORS is enabled for `localhost:5173` and `127.0.0.1:5173`.

---

## Environment variables

### Backend (`.env` in project root)

| Variable | Description |
|----------|-------------|
| `SECRET_KEY` | Django secret key (use a strong value in production) |
| `DEBUG` | `True` for local dev, `False` in production |
| `USE_POSTGRES` | `false` for SQLite locally; `true` when using PostgreSQL |
| `DATABASE_URL` | PostgreSQL connection string (when `USE_POSTGRES=true`) |
| `GROQ_API_KEY` | Groq API key for `/api/chat/` |

Do **not** commit `.env`.

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL, e.g. `http://127.0.0.1:8000/api` |

Do **not** commit `frontend/.env`.

---

## Main API routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/about/` | Site profile |
| `GET` | `/api/skils/` | Skills list |
| `GET` | `/api/experiences/` | Work experience |
| `GET` | `/api/educations/` | Education |
| `GET` | `/api/projects/` | Projects |
| `GET` | `/api/blog/` | Blog posts |
| `POST` | `/api/contact/` | Submit contact form |
| `POST` | `/api/chat/` | AI chat — body: `{"message": "your question"}` |

---

## Frontend scripts

From the `frontend/` folder:

```bash
npm run dev      # Development server
npm run build    # Production build (output: frontend/dist)
npm run preview  # Preview production build locally
```

---

## Deployment (overview)

Typical setup:

| Part | Host | Notes |
|------|------|--------|
| **Backend** | [Render](https://render.com) or [Railway](https://railway.app) | Django + PostgreSQL; set env vars; use Gunicorn |
| **Frontend** | [Vercel](https://vercel.com) or [Netlify](https://netlify.com) | Same repo; **Root Directory:** `frontend` |

**Frontend build env (Vercel):**

```env
VITE_API_URL=https://your-api-domain.onrender.com/api
```

**Backend:** Add your live frontend URL to `CORS_ALLOWED_ORIGINS` in `config/settings.py` (or load from an environment variable).

**Media files** (profile/project images): configure persistent storage or object storage (e.g. S3) for production; local `media/` is not ideal on ephemeral hosts.

---

## License

Private portfolio project — all rights reserved.
