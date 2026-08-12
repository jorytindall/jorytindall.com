# apps/web

The main site — [jorytindall.com](https://jorytindall.com). Next.js 16 App Router,
React 19, CSS Modules, content from Sanity. Deployed on Railway as service `Web`.

Read the [repo-wide contract](../../AGENTS.md) first.

```bash
pnpm web:dev                       # :3000 — needs `infisical login`
pnpm --filter web typecheck        # tsc --noEmit
pnpm --filter web lint
pnpm --filter web test:e2e         # Playwright; needs a build and real secrets
pnpm email                         # react-email preview for src/email/
```

## Layout

```
src/
  app/
    (pages)/          all routes — (home), [slug], blog, events, music, portfolio,
                      speaking, contact
    api/auth/portfolio/route.ts
    layout.tsx  providers.tsx  template.tsx  not-found.tsx  robots.ts
  actions/            server actions — contact email, newsletter, Spotify, Strava
  components/         34 folder-per-component directories
  lib/
    queries/          GROQ, one file per content type, re-exported from index.ts
    sanity/config.ts  the client
    auth/             portfolio password gate
    spotify/ strava/  third-party API clients
  email/              react-email templates
  styles/             main.css imports tokens, then abstracts/
  utils/  types/  content/  tests/e2e/
```

## Imports

`tsconfig.json` maps `"*"` to `"./src/*"`, so bare specifiers are the house style:

```ts
import { Button } from 'components/button';
import { getPortfolioProject } from 'lib/queries';
```

Not relative paths. This used to be `baseUrl: "src"`, which TypeScript 6 deprecates —
`paths` is the replacement and behaves the same.

## The content chain

Content reaches a page in four steps, and **nothing enforces the links between them**:

1. A schema in `apps/admin/schemas/` defines the type and is registered in
   `apps/admin/schemas/index.ts`.
2. A GROQ query in `src/lib/queries/<type>.ts` selects it, by `_type` string.
3. A route under `src/app/(pages)/` calls the query.
4. For anything inside `moduleContent`, `src/components/module-renderer/index.tsx`
   switches on `m._type` and picks the component.

Step 4 is the one that gets forgotten. An unhandled `_type` falls through the switch and
renders nothing — no error, no warning, just a missing section. If content is "not
showing up", check the switch before anything else.

Portable Text marks and blocks are wired separately, in
`src/components/rich-text/Components.tsx`.

Use the `new-sanity-type` skill rather than doing this from memory.

## Styling

- One `.module.css` per component, co-located.
- `src/styles/main.css` imports the built tokens by relative path into `node_modules`
  (`../../node_modules/tokens/dist/web/tokens.css`), then the files in `abstracts/`.
  Because it reaches into built output, `packages/tokens` must have been built — Turbo
  does that via `dependsOn: ["^build"]`.
- Use the semantic custom properties (`--color-semantic-*`), not the core ramp
  (`--color-core-*`). Dark theme is a `:root[data-theme='dark']` block, so anything
  written against a core token will not switch themes. `next-themes` sets the attribute.

## The portfolio password gate

Some portfolio projects are gated behind one shared password.

- `src/lib/auth/portfolioAccess.ts` — reads a `portfolio_access` cookie holding
  base64 `timestamp:password`, compares against `PORTFOLIO_ACCESS_PASSWORD`, expires
  after 7 days.
- `src/app/api/auth/portfolio/route.ts` — sets the cookie.
- `src/components/password-gate/` — the UI.

It is a shared secret in a cookie, not per-user auth. Don't extend it into something it
isn't without saying so.

## Gotchas

- **The build fails hard without Sanity env vars.** `src/lib/sanity/config.ts` calls
  `createClient` at module scope, so `pnpm build` without Infisical throws
  `Configuration must contain 'projectId'` while collecting page data. Use
  `infisical run -- pnpm build`. The upside: a build that passes really did reach Sanity.
- **`src/lib/sanity/useSanityFetch.ts` is dead code** — a client-side fetch hook with no
  callers. All fetching is server-side via `lib/queries/`.
- **ESLint will walk `playwright-report/` if you let it.** Flat config does not read
  `.gitignore`; generated output is listed explicitly in `eslint.config.mjs`.
- `strict: false`, but `strictNullChecks: true`. Implicit `any` will not be caught here.
- **A link click straight after `page.goto()` can be swallowed by hydration.** React has
  attached its handler and calls `preventDefault`, but the router is not ready, so the
  click does nothing and raises no error — roughly one navigation in five. The footer
  tests wrap the click in `expect(...).toPass()` for this reason. The primary-nav tests
  look immune only because they click the menu toggle first, which cannot work until
  hydration is done.
- **The honeypot is not `display: none` on purpose** — bots skip fields that are. It is
  hidden off-screen at `left: -9999px` with `opacity: 0`, which Playwright still counts
  as _visible_ because the bounding box is non-empty. Do not "fix" a honeypot test by
  making the field genuinely hidden; that defeats it.
- **`public/sitemap*.xml` is generated and untracked.** `next-sitemap` writes it in
  `postbuild` (enabled by `enable-pre-post-scripts=true` in `.npmrc`), and Railway
  regenerates it on every deploy. It used to be committed and went stale by eight months.
