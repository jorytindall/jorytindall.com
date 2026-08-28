---
'media-center': minor
---

Harden the session cookie and the auth gate (JT-39).

- **The signed payload now carries an `exp`.** `MAX_AGE` was only set as the cookie's
  `maxAge`, a client-side hint, so a copied cookie value stayed valid forever —
  `verify()` checked the signature and nothing else. The expiry is now signed into the
  payload and checked on read. A payload without an `exp` is rejected, so **existing
  sessions are invalidated and everyone signs in again once.** That matters more than
  usual here because the payload embeds the user's `plexToken`.
- **`security.checkOrigin` is back on**, restoring Astro's CSRF origin check on the
  `/login` form POST. It needs `security.allowedDomains` to work behind Railway: Astro
  rebuilds the request URL from `Host` + `X-Forwarded-Proto` and only trusts those
  headers for listed hosts, so with an empty list `Astro.url.origin` becomes
  `https://localhost` and every login POST 403s. A new domain must be added to that list.
- **`PUBLIC_PATHS` now matches exactly** rather than by prefix. `startsWith('/login')`
  also let `/login-anything` past the auth gate.
