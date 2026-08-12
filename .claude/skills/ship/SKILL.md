---
name: ship
description: The verification gate before a change leaves your machine — run lint and typecheck, add a changeset, commit, push, open the PR, and update the Notion task. Use when work is complete and ready for review.
---

# Ship

Everything between "I think it works" and "it is in review". Do not skip verification
because the change looks small.

## 1. Verify

```bash
pnpm verify        # format:check + lint + typecheck, every workspace, ~7s cold
```

It must exit 0.

`verify` does **not** cover everything — there are no unit tests in this repo, and
`pnpm test` exits 0 having run nothing. Also do, when relevant:

| If you changed                | Also do                                                                     |
| ----------------------------- | --------------------------------------------------------------------------- |
| Anything visual in `web`      | `pnpm web:dev` and actually look at it                                      |
| A Sanity schema               | `pnpm admin:dev`, create a real document, confirm `web` renders it          |
| Anything in the content chain | Check the `module-renderer` switch handles the `_type`                      |
| A design token                | `pnpm tokens:build`, then rebuild the consumer — tokens alone is not enough |
| A route or nav in `web`       | `pnpm --filter web test:e2e` (needs Infisical + a build)                    |
| A slide or slide component    | `pnpm pres:dev` and page through the deck                                   |
| Anything in `media-center`    | `pnpm media:dev` — and remember the whole site is behind auth               |

A full `pnpm build` needs secrets: `infisical run -- pnpm build`. Without them `web`
fails with `Configuration must contain 'projectId'`.

**Never report success on something you did not actually run.** If a step was skipped,
say which and why.

## 2. Add a changeset

Every workspace here is versioned. `.changeset/<kebab-description>.md`:

```md
---
'web': patch
---

What changed and why. Lead with the problem, not the diff.
```

`patch` for fixes, `minor` for features, `major` for breaking changes.
`git diff --name-only main...HEAD` tells you which workspaces were touched. Docs-only
changes to `AGENTS.md` or `README.md` files do not need one.

## 3. Commit

Short imperative subject, then a body explaining **why** — the problem before the change.
Note anything deliberately left undone.

Do not commit `.env*`, `.infisical.json`, or `.claude/settings.local.json`.

## 4. Push and open the PR

```bash
git push -u origin <branch>
gh pr create --base main --title "…" --body "…"
```

The PR template asks for: what and why, workspaces touched, what you actually verified,
and screenshots for anything visual. Fill it in rather than deleting it.

The `Verify` workflow will run `pnpm verify` on the PR. Note that `ci-web.yml` — the
Playwright job — is **disabled** and has not run since December 2025, so nothing checks
e2e for you.

## 5. Update Notion

If there is a 🤘 Projects task, use `sync-notion` to set `PR` to the pull request URL and
confirm `Branch` and `Status` are right. Set `Status` → `Done` only once the PR is
actually merged, not when it is opened.

If there is no task, skip this — do not create one just to close the loop.

## 6. Retrospective — close the loop on friction

**Do this before you call the work shipped, every time.** Ask: what in this session cost
time that should not have?

Look for concrete things, not vibes:

- A command that did the wrong thing, or had a destructive side effect
- Work redone because a doc or an `AGENTS.md` line was stale or simply wrong
- A recipe re-derived that you had already worked out earlier in the same session
- Repeated searches a note in the right `AGENTS.md` would have collapsed
- A permission prompt that should have been in `settings.json`

For each one, do **exactly one** of:

1. **Fix it now** — if it is small and lives in code or docs you are already touching. A
   stale gotcha, a missing `AGENTS.md` line, a `settings.json` entry.
2. **Tell Jory** — plainly, in your final message, if it is bigger or would push the PR
   past its stated scope.

Never both, never silently neither. "I noticed X was confusing", with no fix and no
mention, is how the same hour gets lost twice.

If nothing came up, say so plainly rather than inventing something.

## Checklist

- [ ] `pnpm verify` exits 0
- [ ] Manual verification appropriate to what changed
- [ ] Changeset added with the right packages and bump types
- [ ] Commit message explains why
- [ ] Pushed, PR opened, template filled in
- [ ] Notion task updated, if there is one
- [ ] Retrospective done — each friction point either fixed or raised

## Related

- `sync-notion` · `plan-feature` · [`AGENTS.md`](../../../AGENTS.md)
