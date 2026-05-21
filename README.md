# AUDREY Portfolio (Full Stack)

Personal portfolio with a **Django REST API** backend and a **React (Vite)** frontend. Content is managed in Django Admin and consumed by the web app. Includes a Groq-powered AI chat assistant.

## Stack

| Layer | Technologies |
|-------|----------------|
| **Backend** | Django, Django REST Framework, SQLite (local) / PostgreSQL (production), Groq, django-cors-headers |
| **Frontend** | React, Vite, Chakra UI, Framer Motion, React Router, Axios |

## Backend setup

1. Clone the repo and open the project folder:
   ```bash
   git clone https://patiencejeremiah030-glitch/portfolio_backend
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

**Frontend build env (Vercel)** — required; Vite bakes this in at **build** time:

| Name | Value (example) |
|------|------------------|
| `VITE_API_URL` | `https://portfolio-api.onrender.com/api` |

In Vercel: **Project → Settings → Environment Variables → Production → Add → Save**, then **Deployments → Redeploy** (a new deploy is required after changing env vars).

**Root Directory** must be `frontend`. The repo includes `frontend/vercel.json` for client-side routing (`/about`, etc.).

**Backend:** Add your live frontend URL to `CORS_ALLOWED_ORIGINS` in `config/settings.py` (or load from an environment variable).

**First deploy on Render (empty database):** After `migrate`, load your starter content:

```bash
python manage.py load_initial_portfolio
```

Or add it to the Render **Build Command** (after migrate):

```bash
python manage.py migrate && python manage.py load_initial_portfolio && python manage.py ensure_superuser && python manage.py collectstatic --noinput
```

Then open `https://your-api.onrender.com/admin/`, log in, and re-upload profile/project images if needed.

### Django admin without Render Shell (free tier)

Render Shell may require a paid plan. Use env vars + `ensure_superuser` instead:

1. **Push** the latest code (includes `ensure_superuser` command).
2. **Render** → your API service → **Environment** → add:

   | Key | Value |
   |-----|--------|
   | `DJANGO_SUPERUSER_USERNAME` | e.g. `audrey` |
   | `DJANGO_SUPERUSER_EMAIL` | your email (optional) |
   | `DJANGO_SUPERUSER_PASSWORD` | strong password (mark as secret) |

3. **Settings** → **Build Command** — include after `migrate`:

   ```bash
   python manage.py ensure_superuser
   ```

4. **Save** → wait for automatic redeploy.
5. Log in at `https://YOUR-SERVICE.onrender.com/admin/` with the username and password from step 2.

If the user already exists, deploy skips creation (safe to run every deploy). To change password, update `DJANGO_SUPERUSER_PASSWORD` and delete the old user in admin, or use a new username.

**Images not showing on Vercel?** The API URL can look correct while the file is missing on Render.

**Quick fix (no upload):** In admin, set **Avatar URL** / **Image URL** to a direct link (`https://res.cloudinary.com/...` or any public image URL). Save → refresh the site.

**Permanent fix:** Use **Cloudinary** (free) and re-upload files after setting `CLOUDINARY_URL`:

**Media files (images):** On Render’s free tier, files saved to the server disk often **404 after a redeploy** even when the API shows a correct `/media/...` URL. Use **Cloudinary** (free):

1. Sign up at [cloudinary.com](https://cloudinary.com) → Dashboard → copy **API environment variable** / **CLOUDINARY_URL**.
2. It must look exactly like: `cloudinary://123456789:yourApiSecret@your-cloud-name` (**not** `https://`).
3. Render → **Environment** → add `CLOUDINARY_URL` (secret). If the value is wrong, delete it or fix it — a bad value breaks deploy.
3. Push latest code, redeploy, then **re-upload** avatar and project images in Django admin.
4. `/api/about/` should return `https://res.cloudinary.com/...` URLs; the Vercel site will load them.

Without `CLOUDINARY_URL`, images only work locally or until the next Render redeploy.

### Demo videos (~60 seconds)

| Where | Admin field | Best option |
|-------|-------------|-------------|
| About you | **Intro video URL** | YouTube/Vimeo link (free, no Cloudinary storage) |
| Each project | **Demo video URL** | YouTube/Vimeo link (recommended) |
| Each project | **Demo video** (file) | MP4/WebM/MOV upload, max 60 MB — uses Cloudinary on Render |

**Cloudinary free plan:** includes video (about **100 MB max per file**, monthly **credits** for storage + bandwidth). Short 60s clips are usually fine; heavy traffic can use credits quickly. **YouTube embeds cost nothing** on Cloudinary — use URLs when you can.

---

## License

Private portfolio project — all rights reserved.
