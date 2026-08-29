---
'web': minor
'admin': minor
---

Add content preview for unpublished Sanity content (JT-44).

Editors can now see a document rendered by the real site before publishing it, either in
a live pane inside the Studio (Presentation, with click-to-edit) or in a new tab via an
"Open preview" document action. Both go through Next's draft mode: reads move to
`sanityFetch`, which switches to a token-bearing, uncached client on the `drafts`
perspective only when draft mode is on, so ordinary visitors keep the published CDN path
and each route's `revalidate`.

Access is gated by a short-lived secret the Studio mints per click and the site validates
server-side, so nothing secret ships in the public Studio bundle. Preview pages carry
`noindex, nofollow` and a banner with an exit link.
