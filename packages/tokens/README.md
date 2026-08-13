# tokens

Design tokens built with `style-dictionary`, in light and dark themes. Consumed by `web`,
`presentations` and `media-center` — the only workspace anything else depends on.

```bash
pnpm tokens:build   # runs style-dictionary twice — light, then dark
```

`dist/` is generated and must exist before a consumer can build. Components reference
semantic custom properties — `--color-semantic-*`, never `--color-core-*`, which is pinned
to the light ramp and will not switch themes.

See [`AGENTS.md`](./AGENTS.md) for the token sources and the two-config build, and the
[repo-wide contract](../../AGENTS.md) for everything else.
