---
'web': patch
---

Return a real 404 for a dynamic route whose Sanity document does not exist

Five of the six dynamic routes dereferenced the Sanity result before checking it
existed, so an unknown or unpublished slug threw a `TypeError` and produced a 500
instead of a 404. `[slug]` had the guard but placed it after the destructure, where it
could never run.

- Guard the page component in `[slug]`, `blog/[slug]`, `speaking/[slug]`,
  `events/[slug]` and `music/[slug]` with `notFound()` before destructuring
- Guard each route's `generateMetadata` too — it interpolates `doc.title` and would
  throw first, before the page component was ever reached
- Follow the ordering already used by `portfolio/[slug]`, which was the only route
  doing this correctly
