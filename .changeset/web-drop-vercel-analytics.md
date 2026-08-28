---
'web': patch
---

Remove `@vercel/analytics` (JT-37).

`app/layout.tsx` rendered `<Analytics />` on every page, but this app deploys to Railway
and Vercel Analytics only reports from a Vercel deployment. Off-platform it shipped a
third-party script to every visitor that collected nothing and reported nowhere. Fathom
is the analytics that actually works here and is unaffected.
