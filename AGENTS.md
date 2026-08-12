# AGENTS.md

Operational contract for AI coding agents working in the jorytindall.com monorepo.
This is the canonical agent-facing document; `CLAUDE.md` points here.

Each app and package also has its own `AGENTS.md` with local detail. Read the one for
the workspace you are changing — this file covers only what is true repo-wide.

---

## What this repo is

A pnpm + Turbo monorepo for Jory Tindall's personal web presence: a website, the CMS
behind it, a conference-talk platform, and a personal media browser. Maintained by one
person.

**Apps** (all deployed on Railway, project `jorytindall`, environment `production`):

| App | What it is | Dev port | Domain |
| --- | --- | --- | --- |
| `apps/web` | The main site. Next.js 16 App Router, content from Sanity. | 3000 | `jorytindall.com` |
| `apps/admin` | Sanity Studio v4. Source of all editorial content. | 3333 | `admin.jorytindall.com` |
| `apps/presentations` | SvelteKit 2 + RevealJS 6 conference talks. | 5173 | `presentations.jorytindall.com` |
| `apps/media-center` | Astro 5 media browser wired to a Plex server. | 4321 | `jorytindall.tv` |

**Packages:**

| Package | What it is | Has a build step? |
| --- | --- | --- |
| `packages/tokens` | Design tokens via style-dictionary. Light and dark themes. | Yes — style-dictionary |

## Dependency graph

```
tokens ─┬─→ web
        ├─→ presentations
        └─→ media-center

admin ── no workspace dependencies at all
```

Two consequences worth internalizing:

1. **`admin` is fully isolated.** It does not consume `tokens` and shares no code with
   `web`. Its coupling to `web` is by *convention only*: a schema type name in
   `apps/admin/schemas/` must match the `_type` a GROQ query in `apps/web/src/lib/queries/`
   reads, and the `_type` case in `apps/web/src/components/module-renderer/index.tsx`.
   Nothing enforces any of that. Break it and content silently stops rendering.
2. **`tokens` needs a build before consumers see it.** Turbo handles this — `build` and
   `typecheck` both declare `dependsOn: ["^build"]`. If you invoke a workspace script
   directly with `pnpm --filter`, you bypass Turbo and get whatever is in `dist/` already.

## Commands

Run these from the repo root.

```bash
pnpm install
pnpm dev                                   # all apps
pnpm web:dev    pnpm admin:dev             # or one at a time
pnpm pres:dev   pnpm media:dev
pnpm tokens:build
```

### The verification gate

**Before claiming any change is done, run:**

```bash
pnpm verify        # === turbo run lint typecheck, across every workspace
```

Roughly 7 seconds cold, instant warm, and it **needs no secrets** — that is deliberate,
so it always runs. It must exit 0. Individually:

```bash
pnpm lint          # eslint — web, admin, presentations
pnpm typecheck     # tsc (web, admin), svelte-check (presentations), astro check (media-center)
```

### What `verify` does *not* cover

Do not assume a green `verify` means everything is checked:

- **There are no unit tests anywhere in this repo.** `pnpm test` maps to a Turbo task no
  workspace defines, so it exits 0 having run nothing. Treat a green `pnpm test` as
  meaningless, not as reassurance.
- **The only tests are two Playwright e2e specs** in `apps/web/src/tests/e2e/`. They need
  a build and real secrets, so they are not in `verify`:
  ```bash
  pnpm --filter web test:e2e
  ```
- **`pnpm build` fails locally without Infisical.** `apps/web` calls `createClient` at
  module scope, so a missing `NEXT_PUBLIC_SANITY_PROJECT_ID` throws
  `Configuration must contain 'projectId'` during page-data collection. Run
  `infisical login` once, then `infisical run -- pnpm build`. This is a loud failure, not
  a silent one — a build that succeeds really did reach Sanity.
- **`media-center` has no linting.** No ESLint config, no eslint dependency. `astro check`
  is the only thing looking at it.
- **`tokens` has neither linting nor typechecking.** It is JSON token files plus
  style-dictionary config.
- **`format:check` is not gated.** See *Formatting* below.

### CI

`.github/workflows/verify.yml` runs `pnpm verify` on every push and PR. It needs no
secrets, so it also runs on forks.

`.github/workflows/ci-web.yml` builds `web` and runs Playwright, but it has been
**disabled in the GitHub UI since December 2025** and was failing when it was switched
off. Nothing in it currently runs. Do not tell anyone Playwright "passed in CI" — it has
not run in months.

## Where to make a change

| You want to… | Go to | Then |
| --- | --- | --- |
| Add or change a UI component | `apps/web/src/components/<name>/` | Folder-per-component with a co-located `.module.css` |
| Change a color or type value | `packages/tokens/tokens/` | `pnpm tokens:build`, then rebuild consumers |
| Add or change a content type | `apps/admin/schemas/` | Register in `schemas/index.ts` — then the four-step chain below |
| Render new content on the site | `apps/web/src/lib/queries/`, then the route | Add the `_type` case to `module-renderer/index.tsx` |
| Change Portable Text rendering | `apps/web/src/components/rich-text/Components.tsx` | |
| Add a slide or talk | `apps/presentations/src/presentations/` | Route in `src/routes/<talk>/+page.svelte` |
| Change transactional email | `apps/web/src/email/` | `pnpm email` to preview |

**The content chain is four steps and half-finishing it fails silently.** Adding a
content type means: define the schema → register it in `apps/admin/schemas/index.ts` →
write or extend the GROQ query in `apps/web/src/lib/queries/` → handle the `_type` in
`apps/web/src/components/module-renderer/index.tsx`. Miss the last step and the module
renders as nothing, with no error. Use the `new-sanity-type` skill.

## Conventions

### Components

- Folder-per-component under `apps/web/src/components/<name>/`, with `index.ts`,
  the component, and a co-located `<Name>.module.css`.
- Styling is CSS Modules referencing token custom properties. Never hardcode a color,
  spacing value, or font stack — if a token does not exist, add it to
  `packages/tokens/tokens/` rather than inlining the value.
- `apps/web` resolves bare specifiers from `src/` via the `paths` mapping in
  `tsconfig.json`, so `import { Button } from 'components/button'` is the house style,
  not a relative path.

### TypeScript

- `apps/web` and `apps/admin` are `strict: false` with `strictNullChecks: true`.
  `apps/presentations` and `apps/media-center` are `strict: true`. Don't assume
  strictness.
- No shared base `tsconfig` — each workspace owns its own.
- Sanity schemas use `defineType`, which is what types the `validation` `Rule` argument.
  A schema written as a bare object literal loses that and will let broken validation
  through. See `apps/admin/AGENTS.md`.

### Formatting

Prettier config is at the root: tabs, width 4, print width 100, single quotes.
`pnpm format:check` reports the whole repo, `pnpm format:all` rewrites it.

**Match the style of the file you are editing.** Some files predate the current config,
and reformatting one in passing turns a two-line change into a hundred-line diff.

### Changesets

`web`, `admin`, `presentations`, `media-center` and `tokens` are all versioned. A change
to any of them wants a changeset under `.changeset/`:

```md
---
'web': patch
---

What changed and why.
```

`patch` for fixes, `minor` for features, `major` for breaking changes. Nothing publishes
to a registry — versioning exists for changelogs. Docs-only changes do not need one.

### Branches and commits

`feat/`, `fix/`, `chore/`, `docs/` prefixes. Never commit directly to `main`.

### Secrets

All secrets live in **Infisical**, injected at dev time — that is why the dev scripts
read `infisical run -- next dev`. Run `infisical login` once before your first
`pnpm web:dev` or `pnpm media:dev`. Never write a secret into a file. `.env*` is
gitignored; so is `.infisical.json`.

`apps/web` also expects `PORTFOLIO_ACCESS_PASSWORD`, the shared password gating
protected portfolio projects.

## Gotchas that have bitten before

- **A schema type that is not registered in `apps/admin/schemas/index.ts` does not
  exist.** Two currently are not: `eventList` and `eventListItem`. `eventList` references
  `eventListItem` as an array member, and `eventListItem.ts` contains a single unused
  import and defines nothing at all. Neither is reachable from the Studio. Don't treat
  either as a working example, and don't "fix" them as a side effect of unrelated work.
- **`apps/web/src/lib/sanity/useSanityFetch.ts` is dead.** A client-side fetch hook with
  no callers anywhere. The app fetches server-side through `lib/queries/`.
- **`pnpm --filter <pkg> <task>` bypasses Turbo**, so it will not rebuild `tokens` first.
  After changing a token, use the top-level task or run `pnpm tokens:build` yourself.
- **ESLint flat config does not read `.gitignore`.** Generated output has to be listed in
  the config's ignore array explicitly, or lint will walk minified build artifacts.
- **`apps/admin` node_modules can go stale after a dependency bump** and leave dangling
  pnpm symlinks, which surface as `Cannot find module 'sanity'` from `tsc` while the
  package is plainly there on disk. `pnpm install` fixes it.

## Further reading

- [`apps/web/AGENTS.md`](./apps/web/AGENTS.md) — routes, the content chain, the portfolio gate
- [`apps/admin/AGENTS.md`](./apps/admin/AGENTS.md) — schema layout and conventions
- [`apps/presentations/AGENTS.md`](./apps/presentations/AGENTS.md) — slides, components, RevealJS
- [`apps/media-center/AGENTS.md`](./apps/media-center/AGENTS.md) — Plex integration and sessions
- [`packages/tokens/AGENTS.md`](./packages/tokens/AGENTS.md) — token sources and the build
- [`.claude/README.md`](./.claude/README.md) — the skills and the permission model
