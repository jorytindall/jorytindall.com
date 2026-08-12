# `.claude/`

Claude Code configuration for this repository. Everything here is committed and shared,
except `settings.local.json`.

```
skills/              repo-specific workflows, invoked as /<name>
settings.json        committed permissions — shared
settings.local.json  personal overrides — gitignored, never commit
```

There are deliberately **no `agents/` subagent definitions**. This repo is small enough
that the workspace `AGENTS.md` files carry the domain knowledge; a fleet of specialists
would be more surface than substance. Add one when a real gap shows up, not before.

## Skills

| Skill | Use it when |
| --- | --- |
| `plan-feature` | Starting any non-trivial work — turns a Notion task or a description into a plan and a branch |
| `new-sanity-type` | Adding a CMS content type. The four-step chain across `admin` and `web` that fails silently if you stop early |
| `ship` | Work is done — verify, changeset, commit, PR, update Notion |
| `sync-notion` | Reading or updating the 🤘 Projects tracker |

Invoke with `/plan-feature`, `/ship`, and so on. The typical loop:

```
/plan-feature  →  build (reading the workspace AGENTS.md)  →  /ship
```

Notion is **optional** in all of these. Planning for this repo is deliberately lighter
than a full roadmap process, so `plan-feature` and `ship` work fine from a plain
description with no task to sync.

## Permissions

`settings.json` is deliberately conservative, because it is committed and applies to
anyone who clones the repo.

**Allowed outright:** read-only inspection, read-only `git` and `gh`, the build and
verification commands every workflow depends on, documentation lookups for the actual
stack, and read-only Sanity / Railway / Notion / Figma MCP calls.

**Prompts first:** anything that leaves the machine or mutates shared state — `git push`,
opening or merging a PR, enabling or disabling a workflow, deploying the Studio, Notion
writes, Sanity writes, Railway variable changes and redeploys.

**Denied:** reading `.env*` or `.infisical.json` (secrets), force pushes, and publishing.

Blanket patterns like `Bash(pnpm:*)` or `Bash(npx:*)` are intentionally **not** here —
they permit far more than they appear to (`pnpm publish`, `pnpm dlx <anything>`). Put
personal conveniences in `settings.local.json` instead, where they affect only you.

## Related

- [`../AGENTS.md`](../AGENTS.md) — the repo-wide agent contract
