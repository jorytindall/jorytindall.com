# apps/media-center

A private media browser and help site for a personal Plex server, at
[jorytindall.tv](https://jorytindall.tv). Astro 5, `output: 'server'` with the Node
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
`timingSafeEqual`, 7-day max age. **`SESSION_SECRET` must be at least 32 characters** or
`getSecret()` throws at request time, not at boot — a short secret looks fine until the
first page load.

## Environment

`.env.example` lists what is needed: `PLEX_CLIENT_ID`, `PLEX_SERVER_MACHINE_ID`,
`SESSION_SECRET`, `PUBLIC_APP_URL`. Real values come from Infisical at path
`/media-center`, which is why `dev` is `infisical run --path /media-center -- astro dev`.

## Docs content

`src/content/docs/*.mdx` is an Astro content collection. The schema in
`src/content/config.ts` requires `title`, `description` and `order`, with `category`
defaulting to `general`. `order` drives sidebar sorting — a new article without it will
not compile.

## Gotchas

- **There is no linting here.** No ESLint config, no eslint dependency. `astro check` is
  the only static analysis this workspace gets, so it is doing more work than usual —
  don't skip it.
- `astro check` needs `typescript` resolvable. It resolves from Astro's own location in
  the pnpm store rather than from this workspace, which is why `typescript` is also a
  root devDependency. Removing it from the root breaks `pnpm typecheck` here with a
  confusing interactive "Astro requires typescript" prompt.
- `security.checkOrigin` is **off** in `astro.config.mjs`. That disables Astro's built-in
  CSRF origin check on form posts. It is presumably there for the Plex callback; be
  deliberate about anything that adds a new form.
- `tsconfig.json` extends `astro/tsconfigs/strict` — this workspace is genuinely strict,
  unlike `web` and `admin`.
