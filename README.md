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
| `VITE_GA_MEASUREMENT_ID` | Optional GA4 Measurement ID, e.g. `G-XXXXXXXXXX` (all visitors, including anonymous) |

Do **not** commit `frontend/.env`.

### Google Analytics (GA4)

1. Go to [Google Analytics](https://analytics.google.com/) → **Admin** → create a **GA4** property.
2. **Data streams** → **Web** → add your Vercel URL → copy the **Measurement ID** (`G-…`).
3. **Vercel** → Project → **Settings** → **Environment Variables** → add `VITE_GA_MEASUREMENT_ID` = `G-…` (Production) → **Redeploy**.
4. For local testing, add the same line to `frontend/.env` and restart `npm run dev`.

The app tracks **page views** on each route (`/`, `/about`, `/projects`, etc.). Reports appear in GA4 within a few hours (Realtime shows sooner).

| Metric | Where |
|--------|--------|
| All visitors (anonymous + logged in) | Google Analytics |
| Registered users only | Django admin → **Users** |

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
| `POST` | `/api/auth/register/` | Sign up — `username`, `email`, `password`, `password_confirm` |
| `POST` | `/api/auth/login/` | Log in — `username` (or email), `password` → `{ token, user }` |
| `POST` | `/api/auth/logout/` | Log out — header: `Authorization: Token <token>` |
| `GET` | `/api/auth/me/` | Current user — requires token |

### Admin vs portfolio users

| Purpose | Where |
|---------|--------|
| **You (owner)** | Django admin at `/admin/` — only staff/superuser accounts you create |
| **Visitors** | Must **sign up** (`/register`) or **log in** (`/login`) before the portfolio or API loads |

The site and all portfolio API routes (`/api/about/`, `/api/projects/`, blog, chat, contact, etc.) require a valid `Authorization: Token …` header. Only `/api/auth/register/`, `/api/auth/login/`, and `/api/health/` are public.

In admin → **Users**, filter by non-staff accounts to see how many people registered. Each user shows **Portfolio logins** and **Last active**. Anonymous visitors are **not** counted.

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

**Backend (Render Environment):**

| Variable | Example |
|----------|---------|
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,https://your-app.vercel.app` (no trailing `/`) |
| `ALLOWED_HOSTS` | `portfolio-api.onrender.com` (your Render hostname only) |

On Render, `*.vercel.app` is allowed automatically for CORS. You still should set `CORS_ALLOWED_ORIGINS` with your exact Vercel URL.

**If the home page says "Cannot reach the API":**

1. Open `https://YOUR-RENDER-HOST.onrender.com/api/about/` in the browser — must return JSON, not 404/500.
2. Vercel → **Environment** → `VITE_API_URL` = `https://YOUR-RENDER-HOST.onrender.com/api` → **Redeploy** frontend.
3. Render → service **Live**, env vars saved, **Start Command**: `python manage.py migrate --noinput && gunicorn config.wsgi:application`.

**First deploy on Render (empty database):** After `migrate`, load your starter content:

```bash
python manage.py load_initial_portfolio
```

Or add it to the Render **Build Command** (after migrate):

```bash
pip install -r requirements.txt && python manage.py migrate --noinput && python manage.py load_initial_portfolio && python manage.py ensure_superuser && python manage.py collectstatic --noinput
```

**Start Command** (runs migrations before each deploy goes live — fixes admin 500 when DB is behind code):

```bash
bash scripts/render_start.sh
```

Or inline:

```bash
python manage.py migrate --noinput && gunicorn config.wsgi:application
```

**Render env (required):** `USE_POSTGRES=true`, `DATABASE_URL` from your Postgres instance, `DEBUG=False`, `SECRET_KEY`, `ALLOWED_HOSTS=your-service.onrender.com`.

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

### Admin shows 500 error (especially Projects → Image URL)

Usually the **database is missing the `image_url` column** or an old uploaded image path is broken on Render.

1. Render → **Logs** → look for `column ... image_url does not exist` or `ProgrammingError`.
2. **Start Command** must be:
   ```bash
   python manage.py migrate --noinput && gunicorn config.wsgi:application
   ```
3. Push latest code (includes migration `0004_ensure_project_image_url`) → **Manual Deploy** → wait until **Live**.
4. Open **Projects** → edit project → **Project URLs** → paste **Image URL** only (Imgur `https://i.imgur.com/….jpg`) → **Save**.
5. Do **not** rely on file upload on Render — use **Image URL** only.

### Images on Render (no extra services)

File uploads on Render’s free tier often **disappear after redeploy**. Use a **public image link** in admin instead:

1. Upload your photo anywhere that gives a direct `https://` image URL (e.g. [Imgur](https://imgur.com), [Postimages](https://postimages.org), or your own host).
2. Django admin → **Site profiles** → **Avatar url** → paste the link → **Save**.
3. **Projects** → open a project → **Project URLs** → **Image URL** (paste Imgur link) → **Save**. Preview appears below the field.
4. Check `https://your-api.onrender.com/api/about/` — `avatar` should be your `https://` link.
5. Hard refresh your Vercel site.

### Demo videos (~60 seconds)

| Where | Admin field | Best option |
|-------|-------------|-------------|
| About you | **Intro video URL** | YouTube/Vimeo link |
| Each project | **Demo video URL** | YouTube/Vimeo link (recommended) |

---

## License

Private portfolio project — all rights reserved.
