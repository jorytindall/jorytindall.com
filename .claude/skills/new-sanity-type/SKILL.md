---
name: new-sanity-type
description: Add a Sanity content type and wire it all the way through to the rendered site. Use whenever a new document or object type is needed, or an existing one gains a field that has to render.
---

# New Sanity type

Content reaches a page in this repo through a **four-step chain across two workspaces**,
and three of the four steps fail _silently_ when skipped. This skill exists because
stopping at step two or three looks like it worked.

```
apps/admin/schemas/<type>.ts          define
apps/admin/schemas/index.ts           register        ← skip: Studio never shows it
apps/web/src/lib/queries/<type>.ts    query           ← skip: fields come back undefined
apps/web/src/components/module-renderer/index.tsx     ← skip: renders nothing, no error
```

Decide first: is this a **document** (its own editable entry, usually with a route) or an
**object** (a block embedded in another document's `moduleContent`)? Objects need step 4.
Documents need a route instead.

## 1. Define the schema

`apps/admin/schemas/documents/<name>.ts` or `apps/admin/schemas/objects/<name>.ts`.

```ts
import { BiSomething } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
	name: `thingBlock`,
	title: `Thing Block`,
	type: `object`,
	icon: BiSomething,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			validation: (Rule) => Rule.required().error(`Needs a title.`),
		},
	],
});
```

**`defineType` is mandatory.** It is what types the `Rule` argument. And note the
validation body: `(Rule) => Rule.required()`, concise, no braces. Writing
`(Rule) => { Rule.required() }` returns `undefined` and Sanity applies no rule at all —
that bug was live on ten fields in this repo.

Give `preview.prepare` no type annotation; it is inferred from `preview.select`.

## 2. Register it

In `apps/admin/schemas/index.ts`, add **both** the import and an entry in the
`schemaTypes` array. Two edits, one file. A type missing from the array does not exist as
far as the Studio is concerned, and nothing will tell you.

If it is an object that belongs inside page content, also add it to the `of: [...]` array
in `apps/admin/schemas/objects/moduleContent.ts`.

Confirm with `pnpm admin:dev` — create a real document and save it.

## 3. Query it

Add or extend a GROQ query in `apps/web/src/lib/queries/<type>.ts`:

```ts
import { groq } from 'next-sanity';

export const GET_THINGS = groq`
    *[_type == 'thing' && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
    }
`;
```

Re-export it from `apps/web/src/lib/queries/index.ts` — that barrel is what routes import
from.

**GROQ projections are explicit.** A field you do not name comes back `undefined`, with
no error. When content is missing, check the projection before suspecting the schema.

For a new object inside `moduleContent`, extend the `moduleContent` projection in
whichever query fetches the parent document — an unprojected block arrives as bare
`{_type, _key}`.

## 4. Render it

**For an object:** add a `case` to the switch in
`apps/web/src/components/module-renderer/index.tsx`.

```tsx
case 'thingBlock':
    return <ThingBlock input={m} key={m._key} />;
```

This is the step that gets forgotten. An unhandled `_type` falls out of the switch and
renders nothing — no console warning, no build failure, just an absent section.

**For a document:** add a route under `apps/web/src/app/(pages)/`. Follow
`portfolio/[slug]/page.tsx` as the model — it has `generateMetadata`,
`generateStaticParams` backed by a `*_PATHS` query, `export const revalidate`, and
`notFound()` on a miss.

**For new Portable Text marks or blocks:** those are wired in
`apps/web/src/components/rich-text/Components.tsx`, not in the module renderer.

## 5. The component

New components go in `apps/web/src/components/<name>/`, folder-per-component with an
`index.ts` and a co-located `.module.css`. Import it in the module renderer with a bare
specifier (`components/thing-block`), not a relative path.

Style with semantic tokens (`--color-semantic-*`), never the core ramp — core tokens do
not respond to the dark theme.

## Verify

```bash
pnpm verify
pnpm admin:dev     # create a document with the new type, save it
pnpm web:dev       # confirm it renders — needs `infisical login`
```

Typecheck will not catch a broken chain: the schema, the query and the switch are coupled
by string literals. **Seeing it render is the only real verification.**

## Related

- [`apps/admin/AGENTS.md`](../../../apps/admin/AGENTS.md) · [`apps/web/AGENTS.md`](../../../apps/web/AGENTS.md) · `ship`
