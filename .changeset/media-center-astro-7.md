---
'media-center': major
---

Upgrade Astro 5 → 7 to close the last critical advisory in the repo.

`astro` ^5.18.2 → ^7.4.4 fixes the critical RCE through AVIF image optimization, plus a
Host-header SSRF in the prerendered error page fetch and a reflected XSS via an
unescaped slot name. `@astrojs/node` ^9.5.5 → ^11.1.9 fixes a malformed-port Host header
crashing the adapter, and `@astrojs/mdx` goes ^4.3.14 → ^8.1.2 to match.

Three breaking changes needed code, not just version numbers:

- **Secrets now come from `process.env`.** Astro 6 made `experimental.staticImportMetaEnv`
  the default, so every `import.meta.env` lookup is inlined at build time. `SESSION_SECRET`,
  `PLEX_CLIENT_ID` and `PLEX_SERVER_MACHINE_ID` are injected at runtime, so reading them
  through `import.meta.env` would have frozen them to the build environment — `undefined`
  on Railway, which 500s every request, or a real secret baked into the bundle if one were
  present at build time. They read `process.env` now. `import.meta.env.PROD` stays, since a
  build-time constant is exactly what it should be.
- **Content collections moved to the content layer.** `src/content/config.ts` became
  `src/content.config.ts` with an explicit `glob()` loader; the old path now throws
  `LegacyContentConfigError` and implicit `type: 'content'` throws
  `ContentCollectionInvalidTypeError`. `z` imports from `astro/zod` rather than
  `astro:content`.
- **Entry IDs no longer carry a file extension**, so the `.replace(/\.mdx?$/, '')` the docs
  routes and sidebar applied to `entry.id` is gone.

Astro 7 also raises its Node floor to `>=22.23.4`. The root `.nvmrc` said a bare `22`,
which Railway's mise resolved to 22.23.3, so the deploy failed while local builds on a
newer Node passed. `.nvmrc` is now pinned to `22.23.4` and the root `engines.node` matches.

Marked major because the app's environment contract changed: a deploy that only supplied
these variables at build time would now break.
