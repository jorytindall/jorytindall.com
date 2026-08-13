# 👋 Hello there!

My name is Jory Tindall, I'm a product designer and design technologist specializing in design systems, currently building the [Helios Design System](https://helios.hashicorp.design) with a dedicated team of product designers and developers.

You might also find me performing as a saxophonist in Seattle and the Pacific Northwest and teaching the next generation of shredders. If you're interested in music and music education, check out [Downbeat Academy](https://downbeatacademy.com), a growing resource for students, musicians, and educators.

This monorepo is managed by `pnpm` workspaces and TurboRepo.

| Workspace            | What it is                                                                                                                                           | Where it lives                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `apps/web`           | My [personal website](https://jorytindall.com) for design, development, and music. [Next.js](https://nextjs.org/).                                   | `jorytindall.com`               |
| `apps/admin`         | The content management system behind the website. [Sanity](https://www.sanity.io/).                                                                  | `admin.jorytindall.com`         |
| `apps/presentations` | Conference talks and design systems education, built with an unusual pairing of [Svelte](https://svelte.dev/) and [RevealJS](https://revealjs.com/). | `presentations.jorytindall.com` |
| `apps/media-center`  | A personal media browser wired up to Plex. [Astro](https://astro.build/).                                                                            | `jorytindall.tv`                |
| `packages/tokens`    | Design tokens managed with `style-dictionary`.                                                                                                       | —                               |

Everything deploys to [Railway](https://railway.app).

## Getting started

```bash
pnpm install
pnpm dev            # every app at once, or use web:dev / admin:dev / pres:dev / media:dev
```

Secrets live in [Infisical](https://infisical.com) and are injected at dev time, so you
will need `infisical login` before `pnpm web:dev` or `pnpm media:dev` will work.

A couple of others worth knowing:

```bash
pnpm tokens:build   # after changing a design token — `pnpm --filter` won't do this for you
pnpm format:all     # prettier, whole repo. Safe to run anytime
```

Before pushing anything:

```bash
pnpm verify         # format + lint + typecheck; needs no secrets
```

There are no unit tests here — `pnpm test` exits 0 having run nothing. The real suite is
`pnpm --filter web test:e2e`, two Playwright specs that need Infisical and a dev server.

## Working here

If you are an AI coding agent — or a person who wants the same briefing — start with
**[AGENTS.md](./AGENTS.md)**. It is the canonical contract, and each workspace has its own
with local detail.

The Claude Code setup is committed too: **[`.claude/README.md`](./.claude/README.md)**
covers the repo's skills — `/plan-feature`, `/new-sanity-type`, `/ship`, `/sync-notion` —
and the permission model behind them.
