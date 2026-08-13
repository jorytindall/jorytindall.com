# apps/admin

Sanity Studio v4 — the source of all editorial content for `apps/web`.
Project `j9ccckrc`, dataset `production`. Deployed on Railway as service `Admin`.

Read the [repo-wide contract](../../AGENTS.md) first.

```bash
pnpm admin:dev                     # Studio on :3333
pnpm --filter admin typecheck      # tsc --noEmit
pnpm --filter admin lint
pnpm admin:build
```

This workspace has **no dependency on any other workspace** — not on `tokens`, not on
`web`. Changing a component in `web` cannot break the Studio, and vice versa.

## Layout

```
schemas/
  index.ts            the registry — a type not listed here does not exist
  documents/          14 document types
  objects/            ~35 object types, including form/, features/, tabs/
sanity.config.ts      plugins and desk structure
sanity.cli.ts
utils/
```

## Adding a type

1. Create the file under `schemas/documents/` or `schemas/objects/`.
2. **Import and add it to both the import block and the `schemaTypes` array in
   `schemas/index.ts`.** Forgetting this is the single most common mistake here — the
   file exists, the Studio never sees it, and nothing errors.
3. Then wire it through to `web`: GROQ query, route, and the `module-renderer` switch.
   See the repo-wide content chain, or use the `new-sanity-type` skill.

## Conventions

**Every schema is wrapped in `defineType`:**

```ts
import { defineType } from 'sanity';

export default defineType({
	name: 'thing',
	type: 'object',
	fields: [
		/* … */
	],
});
```

This is not cosmetic. `defineType` is what gives the `validation` callback a typed `Rule`
argument. Without it, `Rule` is implicitly `any` and mistakes pass silently — ten
validation rules in this repo were written as

```ts
validation: (Rule) => {
	Rule.required().error('…');
}; // WRONG — block body, no return
```

which evaluates to `undefined`, so Sanity applied no validation at all. Fields that were
meant to be required had never been required. Write the concise body:

```ts
validation: (Rule) => Rule.required().error('…'),      // right
```

Other conventions:

- Backtick strings for `name`, `title` and `description` in most files. Match the file
  you are editing.
- `preview.prepare` takes its parameter shape from `preview.select` — do not annotate it
  with a hand-written interface, which will conflict with the inferred type.
- Five schemas under `objects/features/` and `objects/form/` are still `.js`. They are
  not typechecked. Convert to `.ts` with `defineType` if you touch one substantially.

## Gotchas

- **`eventList` and `eventListItem` are both orphans.** Neither is registered in
  `schemas/index.ts`. `eventList.ts` declares an array of `eventListItem`, and
  `eventListItem.ts` contains one unused import and defines nothing at all — it is an
  empty file with an import statement. Neither is reachable from the Studio. Don't copy
  either as a pattern; don't half-fix them during unrelated work.
- **Stale `node_modules` after a dependency bump** leaves dangling pnpm symlinks and
  produces `Cannot find module 'sanity'` from `tsc`, even though `node_modules/sanity`
  is right there in a directory listing (it is a symlink to a store path that no longer
  exists). `pnpm install` from the repo root fixes it.
- `sanity deploy` publishes the Studio to Sanity's hosting, which is **not** where this
  is served from — Railway is. Don't run it casually.
