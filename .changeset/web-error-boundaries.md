---
'web': minor
---

Add `error.tsx` and `global-error.tsx` (JT-34).

`app/` had `not-found.tsx` but no error boundary, so any server exception fell through
to Next's unstyled default page. Both new boundaries are styled with tokens to match
`not-found.tsx` and offer a `reset()` control alongside a link home. `global-error.tsx`
replaces the root layout when the layout itself throws, so it renders its own
`<html>`/`<body>` and imports `styles/main.css` directly.
