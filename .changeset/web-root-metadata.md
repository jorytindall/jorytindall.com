---
'web': minor
---

Set `metadataBase` and a root title template (JT-36).

`app/layout.tsx` exported no metadata at all. It now sets `metadataBase`, so relative OG
and Twitter image URLs stop resolving against localhost and warning at build, plus a
`title.template` of `%s | Jory Tindall` and default `description`, `openGraph` and
`twitter` blocks for routes that define none of their own.

Ten routes hand-wrote the same suffix, and the homepage disagreed with the other nine.
Each route now sets only its own name. Rendered titles are unchanged; the suffix has one
source. The root `openGraph`/`twitter` blocks deliberately set no `title` or
`description` — Next fills those per route from the resolved page values, and setting
them at the root would pin every page's og:title to the homepage's.
