---
'web': minor
---

Serve the résumé (JT-64, phase 4): `/resume.pdf` and `/resume.json` for the default variant, `/resume/<slug>.pdf` and `/resume/<slug>.json` for named ones. Responses carry ETag, Last-Modified and Cache-Control; the rendered PDF is cached server-side under one tag and expired by a signed Sanity webhook at `/api/revalidate/resume` on publish. Unknown slugs 404 without querying Sanity; a variant that overflows one page returns 500 and logs.
