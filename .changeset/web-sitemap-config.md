---
'web': patch
---

Drop the dead robots.txt config from `next-sitemap.config.js` (JT-35).

The config set `generateRobotosTxt` — with an extra `o`. The real option is
`generateRobotsTxt` and it defaults to `false`, so next-sitemap never generated a robots
file and the `robotsTxtOptions` block below it never did anything.

That accident is the correct outcome: `app/robots.ts` is the real source, and a static
`public/robots.txt` would take precedence over the App Router route. Fixing the spelling
would have silently replaced the working robots.txt with a version that has no sitemap
pointer. The dead keys are removed rather than corrected, with a comment recording why.
No production behaviour changes.
