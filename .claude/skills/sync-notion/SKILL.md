---
name: sync-notion
description: Read or update the 🤘 Projects tracker in Notion for jorytindall.com work. Use when fetching a task, moving its status, or recording a branch or PR against it.
---

# Sync Notion

Work on this repo is tracked in **Personal Brand → Website → 🤘 Projects**.

```
database    https://www.notion.so/d9c31f290eb383a6a66c810358217034
data source collection://7f431f29-0eb3-835d-890e-875819ae7b71
```

Tracking here is **light and optional**. Plenty of work in this repo has no task at all.
Do not create one just so a workflow has something to update, and do not block on Notion
being unreachable — say so and carry on.

## Schema

| Property   | Type   | Values                                   |
| ---------- | ------ | ---------------------------------------- |
| `Name`     | title  |                                          |
| `Type`     | select | `Project`, `Task`                        |
| `Status`   | status | `Backlog`, `Todo`, `In progress`, `Done` |
| `Priority` | select | `High`, `Medium`, `Low`                  |
| `Branch`   | text   | the git branch, set by `plan-feature`    |
| `PR`       | text   | the pull request URL, set by `ship`      |

That is the whole schema. There is no epic relation, no LOE, no sprint — do not look for
them or invent them.

## Reading

Fetch one page by URL or ID:

```
notion-fetch  <page url or id>
```

Query the tracker — for instance, everything in flight:

```
notion-query-data-sources
  data_source_url: collection://7f431f29-0eb3-835d-890e-875819ae7b71
  filter on Status = "In progress"
```

If you were given a task name rather than a link, use `notion-search` scoped to the data
source before guessing.

## Writing

Use `notion-update-page`. **Writes prompt for permission — always say what you are about
to change before calling it**, and never batch several unrelated updates into one silent
sweep.

The two moments that matter:

| When                                     | Set                                              |
| ---------------------------------------- | ------------------------------------------------ |
| `plan-feature`, after cutting the branch | `Status` → `In progress`, `Branch` → branch name |
| `ship`, after opening the PR             | `PR` → pull request URL                          |
| After the PR is **merged**               | `Status` → `Done`                                |

`Done` means merged, not "PR opened". Getting that wrong makes the board lie.

## Rules

- Never change `Priority` or `Type` on Jory's behalf — those are his calls.
- Never create a task to record work that is already finished.
- If a task's body contradicts what was actually built, say so rather than quietly
  editing the body to match.

## Related

- `plan-feature` · `ship`
