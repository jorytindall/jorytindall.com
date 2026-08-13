# media-center

[jorytindall.tv](https://jorytindall.tv) — a private media browser and help site for a
personal Plex server. Astro 5, server output, behind Plex PIN auth.

```bash
pnpm media:dev      # :4321 — needs `infisical login` first
pnpm media:build
```

There is no ESLint here. `astro check`, via `pnpm typecheck`, is the only static analysis
this app gets.

See [`AGENTS.md`](./AGENTS.md) for the auth flow and session handling, and the
[repo-wide contract](../../AGENTS.md) for everything else.
