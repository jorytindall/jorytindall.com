# apps/media-center

A private media browser and help site for a personal Plex server, at
[jorytindall.tv](https://jorytindall.tv). Astro 7, `output: 'server'` with the Node
adapter. Deployed on Railway as service `Media Center`.

Read the [repo-wide contract](../../AGENTS.md) first.

```bash
pnpm media:dev                              # :4321 — needs `infisical login`
pnpm --filter media-center typecheck        # astro check
pnpm media:build
```

## Layout

```
src/
  middleware.ts        auth gate for the whole site
  lib/plex.ts          Plex PIN-based OAuth
  lib/session.ts       HMAC-signed session cookie
  pages/
    index.astro        the dashboard
    login.astro  auth/callback.astro  auth/logout.astro
    docs/index.astro  docs/[...slug].astro
  content.config.ts    the docs collection's glob() loader and schema
  content/docs/        MDX help articles, an Astro content collection
  components/          docs/, layout/, navigation/ — each with a co-located .module.css
  styles/
```

## Auth

The whole site is private. `src/middleware.ts` runs on every request: anything outside
`/login`, `/auth/callback` and `/auth/logout` requires a session or gets redirected to
`/login`.

The flow is Plex's PIN OAuth — `createPin()` → redirect the user to `getAuthUrl()` →
Plex forwards back to `/auth/callback` → `checkPin()` exchanges for a token →
`hasServerAccess()` confirms the account is actually shared on the server → a session
cookie is set.

Sessions are an HMAC-SHA256-signed cookie (`plex_session`), verified with
`timingSafeEqual`. **`SESSION_SECRET` must be at least 32 characters** or `getSecret()`
throws at request time, not at boot — a short secret looks fine until the first page
load.

The 7-day expiry is signed _into_ the payload as `exp` and checked in `getSession()`.
The cookie's `maxAge` alone is only a client-side hint, which a copied cookie value
ignores. A payload without an `exp` is rejected outright, so changing this shape logs
everyone out — that is the intended trade.

## Environment

`.env.example` lists what is needed: `PLEX_CLIENT_ID`, `PLEX_SERVER_MACHINE_ID`,
`SESSION_SECRET`, `PUBLIC_APP_URL`. Real values come from Infisical at path
`/media-center`, which is why `dev` is `infisical run --path /media-center -- astro dev`.

**Read them from `process.env`, never `import.meta.env`.** Astro inlines every
`import.meta.env` lookup at build time (the default since Astro 6), so a secret read that
way is frozen to whatever the build environment held — `undefined` on Railway, which
throws on the first request, or a real secret baked into the committed bundle if one
happened to be present. `import.meta.env.PROD` is fine; it is genuinely a build-time
constant.

## Docs content

`src/content/docs/*.mdx` is an Astro content collection, loaded by the `glob()` loader
declared in `src/content.config.ts` (the content-layer path — `src/content/config.ts`
throws `LegacyContentConfigError` since Astro 6). The schema requires `title`,
`description` and `order`, with `category` defaulting to `general`. `order` drives
sidebar sorting — a new article without it will not compile.

An entry's `id` is its filename without the extension, so `getting-started.mdx` is
reachable at `/docs/getting-started` and the routes compare `doc.id` to the slug
directly.

## Gotchas

- **There is no linting here.** No ESLint config, no eslint dependency. `astro check` is
  the only static analysis this workspace gets, so it is doing more work than usual —
  don't skip it.
- `astro check` needs `typescript` resolvable. It resolves from Astro's own location in
  the pnpm store rather than from this workspace, which is why `typescript` is also a
  root devDependency. Removing it from the root breaks `pnpm typecheck` here with a
  confusing interactive "Astro requires typescript" prompt.
- `security.checkOrigin` is **on** (Astro's default), and it only stays working because
  `security.allowedDomains` in `astro.config.mjs` lists the production hosts. Astro
  rebuilds the request URL from `Host` + `X-Forwarded-Proto`, and only trusts those
  headers for hosts on that list — drop the list and `Astro.url.origin` becomes
  `https://localhost`, which 403s the `/login` form POST in production. **A new domain
  has to be added there**, or logging in from it breaks.
- **Astro pins a Node _patch_ floor**, currently `>=22.23.4`, and the root `.nvmrc` is
  what Railway's mise reads. It used to say a bare `22`, which mise resolved to 22.23.3 —
  one patch short — so `astro build` refused to run on Railway while building fine on any
  newer local Node. `.nvmrc` is pinned to an exact version for that reason; when Astro
  raises the floor again, raise the pin with it.
- `tsconfig.json` extends `astro/tsconfigs/strict` — this workspace is genuinely strict,
  unlike `web` and `admin`.
