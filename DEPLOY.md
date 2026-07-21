# Deploying mlm-ui to Netlify

The Angular 21 SSR app is hosted on [Netlify](https://netlify.com). A Netlify rewrite
proxies `/api/*` to the Render API, so the browser only ever talks to the Netlify
origin — the httpOnly auth cookie therefore stays **first-party** and works without
cross-site cookie/CORS workarounds.

## Prerequisite
Deploy the API first (see `mlm-api/DEPLOY.md`) and note its public URL, e.g.
`https://mlm-api.onrender.com`.

## 1. Point the proxy at your API
In `netlify.toml`, set the redirect target to your Render API URL:
```toml
[[redirects]]
  from = "/api/*"
  to = "https://<your-api>.onrender.com/:splat"
  status = 200
  force = true
```

## 2. Create the Netlify site
1. Netlify dashboard → **Add new site → Import an existing project** → connect this repo.
2. Netlify auto-detects Angular. Confirm the settings match `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist/mlm/browser`
   - **Node version:** 24 (set via `netlify.toml` — `@netlify/angular-runtime` v4 needs Node ≥ 22.22/24.13).
   - SSR is enabled by the `@netlify/angular-runtime` **devDependency** (v4, in
     `package.json`); it's applied automatically, so there is intentionally no
     `[[plugins]]` entry (that would load Netlify's older managed version and fail the
     Angular 21 SSR version check).
3. Deploy.

No auth-related environment variables are needed on Netlify — the API base URL stays
the relative `/api`, resolved by the proxy above.

## Google sign-in
Google sign-in is enabled on the login/signup pages via Google Identity Services.

- The Web Client ID is a **build-time constant** in
  `src/app/auth/google.config.ts` (`565975617810-…apps.googleusercontent.com`). It is
  **public** (not a secret) and must match the API's `Authentication:Google:ClientId`.
- In the [Google Cloud console](https://console.cloud.google.com/apis/credentials),
  add your Netlify site URL (and any custom domain) to the OAuth client's
  **Authorized JavaScript origins** — otherwise Google blocks the button with an
  "origin mismatch" error. Include `http://localhost:4200` for local dev.
- No redirect URIs needed (ID-token flow).

## 3. Verify
1. Open the Netlify site URL.
2. **Register** a member, then **Log in**. In DevTools → Network, the `/api/login`
   response should set an `access_token` cookie on the Netlify origin (`HttpOnly`,
   `SameSite=Lax`, `Secure`).
3. Open **Referrals** and **Network** — they should load your data (guarded routes).
4. Click **Sign in with Google** — it should create/log in the account and set the same
   `access_token` cookie. (Requires the Netlify origin to be in the Google client's
   Authorized JavaScript origins.)

## How it fits together
```
Browser ──► https://<site>.netlify.app        (Angular SSR)
              │  /api/*  →  netlify.toml rewrite (status=200)
              ▼
           https://<api>.onrender.com           (.NET API + Render Postgres)
```

## Notes
- The API's first request after idle may be slow (Render free tier cold start), and
  that latency is visible through the proxy too.
- `API_BASE` in `src/app/users/user.service.ts` is the relative `/api`; do not change it
  unless you move off the proxy model (which would reintroduce cross-site cookie/CORS
  concerns).
- Dynamic/auth routes render client-side (`app.routes.server.ts`), so SSR makes no API
  calls — the relative `/api` is only ever used in the browser.
