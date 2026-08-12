---
name: plan-feature
description: Turn a Notion task or a plain description into an implementation plan and a correctly-named branch in the jorytindall.com monorepo. Use at the start of any non-trivial piece of work, before writing code.
---

# Plan a feature

Gets from "here is a thing to build" to "here is a plan and a branch", with the right
context loaded.

## 1. Establish what is being asked

**If given a Notion task** — use the `sync-notion` skill to fetch it from 🤘 Projects.
Read the body, the `Type` and the `Priority`.

**If given a description** — restate the goal in one sentence and confirm it before
planning. There is often no Notion task for work in this repo, and that is fine; do not
go looking for one or invent one.

Either way, end this step knowing: what changes for a visitor to the site, and how you
will know it works.

## 2. Work out which workspaces are involved

Use the routing table in the root [`AGENTS.md`](../../../AGENTS.md), then **read the
`AGENTS.md` of every workspace you will touch** — they carry the gotchas.

Quick routing:

| Change                            | Workspace                                  |
| --------------------------------- | ------------------------------------------ |
| Page, route, component, rendering | `apps/web`                                 |
| Content type / CMS schema         | `apps/admin` → then `apps/web`             |
| Color, spacing, type value        | `packages/tokens` (then rebuild consumers) |
| A talk or a slide                 | `apps/presentations`                       |
| Plex browser, help docs           | `apps/media-center`                        |

Watch for changes that cross a boundary — that is where the real work is:

- **A new content type is a four-step chain** across `admin` and `web`, and the last step
  (`module-renderer`) fails silently if you skip it. Use `new-sanity-type`.
- **A token change requires rebuilding consumers**, not just `tokens`.

## 3. Look for what already exists

Before proposing new code, search for it:

- Is there already a component in `apps/web/src/components/`? There are 34 — check the
  directory, not just your memory.
- Is there already a GROQ query in `apps/web/src/lib/queries/`?
- Is there a util in `apps/web/src/utils/` that covers this? (`getSanityImage`,
  `linkResolver`, `datetimeFormat`, `getCurrentEvents`, …)
- In `presentations`, is there a `Box`/`Text`/`Callout` prop that does this already?

## 4. Check what is deliberately broken

The root `AGENTS.md` has a **Gotchas** section, and each workspace has its own. Several
things look broken because they are: `eventList` and `eventListItem` are unregistered
orphans, `useSanityFetch.ts` is dead, `ci-web.yml` is disabled. Do not plan a fix for one
of these as a side effect of unrelated work. If the task genuinely requires it, say so
and scope it explicitly.

## 5. Write the plan

State, briefly:

- **Goal** — one sentence.
- **Files to change** — actual paths, grouped by workspace, packages before apps.
- **Approach** — the shape of the change, and anything reused.
- **Verification** — the specific commands, plus what to check by hand. `pnpm verify` is
  the floor, not the whole answer; anything visual needs the running app.
- **Out of scope** — what you are deliberately not doing.

Keep it scannable. If the work is genuinely small, one paragraph is a complete plan.

## 6. Branch and mark it started

```bash
git checkout main && git pull
git checkout -b <prefix>/<kebab-case-description>
```

Prefixes: `feat/`, `fix/`, `chore/`, `docs/`.

If there is a Notion task, use `sync-notion` to set `Status` → `In progress` and
`Branch` → the branch name. Confirm before writing.

## Rules

- Never start on `main`.
- Read the workspace `AGENTS.md` before planning changes in it — not after.
- If the plan requires a decision only Jory can make, ask before building, not after.

## Related

- `sync-notion` · `new-sanity-type` · `ship`
