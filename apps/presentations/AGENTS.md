# apps/presentations

Conference talks, built as SvelteKit 2 routes wrapping RevealJS 6. Svelte 5 runes.
Deployed on Railway as service `Presentations` via `@sveltejs/adapter-node`.

Read the [repo-wide contract](../../AGENTS.md) first.

```bash
pnpm pres:dev                            # :5173
pnpm --filter presentations typecheck    # svelte-kit sync && svelte-check
pnpm --filter presentations lint
pnpm pres:build
```

## Layout

```
src/
  routes/<talk-slug>/+page.svelte    one route per talk; sets up the Reveal deck
  presentations/<talk-slug>/         Presentation.svelte plus slides/
  components/                        16 shared slide components
  lib/slideContext.svelte.ts         runes-based context for slide metadata and index
  styles/
```

A talk is a route that instantiates `new Reveal(...)` over a `Presentation.svelte`, which
composes slide components. Slides live under `presentations/<talk>/slides/`, usually
grouped into numbered section folders.

## Components

`Slide`, `Box`, `Text`, `Headline`, `Callout`, `Code`, `CoverSlide`, `Notes`, `Link`,
`Presenters`, `ProgressBar`, `SteppedProgressBar`, `TableOfContents`, `DifficultyCard`,
`SlideHeader`, `Youtube`.

`Box` and `Text` are the layout and typography primitives, and both take **closed prop
unions** — `Box` accepts `textAlign`, `justifyContent`, `flexDirection`, `flexWrap`,
`alignItems`, `alignContent`, `gap`. Passing a value outside the union, or a prop that
does not exist, is not an error at runtime: unknown props fall through `...rest` onto the
DOM as invalid attributes, and out-of-range values produce a class with no matching CSS.
Several slides had `justify="center"` (the prop is `justifyContent`), `textAlign="start"`
(it is `left`), and `gap="x-small"` (which had no CSS rule) doing nothing at all.

`svelte-check` catches all of these now. Run it.

When adding a variant to `Box` or `Text`, **add both the union member and the CSS rule.**
One without the other is exactly the failure above.

## Conventions

- Svelte 5 runes: `$props()`, `$state()`, `$derived()`. Components take a typed props
  object plus `& HTMLAttributes<...>`.
- `<script lang="ts">` throughout the shared components; individual slides are often
  plain JS with JSDoc types where needed.
- Keyed `{#each}` blocks are enforced by `svelte/require-each-key`.
- Unused variables are a warning; prefix with `_` to opt out deliberately.

## Gotchas

- **`typecheck` runs `svelte-kit sync` first**, because `tsconfig.json` extends
  `./.svelte-kit/tsconfig.json`, which is generated. On a clean checkout, running
  `svelte-check` alone fails.
- **`svelte-check` needs TypeScript 6, not 7.** It throws on TS 7 unless you pass
  `--tsgo`. The workspace pins `typescript@^6.0.3` for that reason — do not bump it to 7
  casually.
- **ESLint needs the TypeScript parser wired in twice**: once as `parser` for `**/*.ts`,
  once as `parserOptions.parser` for `**/*.svelte` so `lang="ts"` blocks parse. Setting
  `parser` globally instead clobbers the Svelte parser and every `.svelte` file fails to
  parse. `eslint-plugin-svelte` must be ≥ 3.18 to work with ESLint 10.
- Base `no-unused-vars` is off for `.ts` files — it misreads parameter names in
  `interface` method signatures as unused variables. `svelte-check` covers those.
- Reveal's `deck.on('slidechanged', …)` types its handler argument as a bare `Event`; the
  slide index arrives as `event.indexh` and needs a cast.
