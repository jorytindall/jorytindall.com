---
'web': patch
'admin': patch
'presentations': patch
'media-center': patch
'tokens': patch
---

Correct four pieces of drifted repo metadata.

`pnpm-workspace.yaml` listed a `presentations/*` glob that matched nothing — the app is at
`apps/presentations`. `turbo.json` defined a `deploy` task nothing invoked; Railway is the
deploy path, and `admin`'s own `sanity deploy` script is still reachable through
`pnpm --filter admin deploy`.

`apps/web` declared `packageManager: pnpm@10.19.0` against the root's `pnpm@10.13.1`. Only
the root field is authoritative for a pnpm workspace, and Railway builds `web` from the
repo root, so the nested one was misleading rather than load-bearing. Removed.

Node is now declared once: `engines` on the root package (`node >=22`, `pnpm >=10`) plus a
`.nvmrc`. `ci-web.yml` was pinning Node 20 and pnpm 8 — pnpm 8 cannot read this repo's
lockfile, so it would have failed on install had it been re-enabled. It now matches
`verify.yml`: Node 22, and no pnpm pin so `packageManager` stays the single source.
