# packages/tokens

Design tokens, built with style-dictionary 5. The only package in the repo, and the only
workspace anything else depends on.

Read the [repo-wide contract](../../AGENTS.md) first.

```bash
pnpm tokens:build     # runs style-dictionary twice — light, then dark
```

## Sources

```
tokens/
  color/core.light.json     the light ramps
  color/core.dark.json      the dark ramps
  color/semantic.json       aliases pointing at core, shared by both themes
  typography/font-family.json  font-size.json  line-height.json
```

## The two-config build

There are two style-dictionary configs and they differ in exactly two ways:

| | `config.json` | `config.dark.json` |
| --- | --- | --- |
| `source` glob | `tokens/**/!(*.dark).json` | `tokens/**/!(*.light).json` |
| CSS `selector` | `:root` | `:root[data-theme='dark']` |
| CSS output | `dist/web/tokens.css` | `dist/web/tokens-dark.css` |

So `semantic.json` is compiled **twice** — once resolving against the light core ramp,
once against the dark one. The semantic layer is what makes theming work; the core ramps
are an implementation detail of it.

Each config emits CSS, SCSS and flat JSON into `dist/web/`.

## Rules

- **Consumers use semantic tokens** — `--color-semantic-*`. A component written against
  `--color-core-*` is pinned to the light ramp and will not switch themes, because the
  dark override only redefines the semantic layer's resolved values.
- Adding a color means adding it to **both** `core.light.json` and `core.dark.json`, then
  aliasing it in `semantic.json`. A core token added to only one theme resolves to
  nothing in the other.
- `dist/` is generated. Never edit it, never commit a hand-change to it.

## Gotchas

- **Consumers import the built CSS by relative path into `node_modules`** — for example
  `apps/web/src/styles/main.css` starts with
  `@import '../../node_modules/tokens/dist/web/tokens.css'`. So `dist/` must exist before
  a consumer builds. Turbo handles this through `dependsOn: ["^build"]`; `pnpm --filter`
  does not, so run `pnpm tokens:build` yourself if you go around Turbo.
- Theme switching is driven by a `data-theme` attribute on `:root`, set by `next-themes`
  in `apps/web`. `presentations` and `media-center` import the same token files and
  handle the attribute themselves.
- This workspace has **no lint and no typecheck** — it is JSON plus config. `pnpm verify`
  passes over it entirely, so review token changes by eye and by building a consumer.
