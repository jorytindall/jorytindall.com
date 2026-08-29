# Content preview

How unpublished Sanity content gets rendered by the real website, and what has to be
configured for it to work.

## What it does

An editor working in the Studio can see a document as the site will render it, before
publishing. There are two ways in, both landing on the same machinery:

| Route in                | Where it opens                 | Use it when                                                                  |
| ----------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| **Presentation** tool   | A pane inside the Studio       | Editing and watching the page update, with click-to-edit back to each field  |
| **Open preview** action | A new browser tab, on the site | Checking the page full-size, or on a browser that blocks third-party cookies |

Both render through the same components as production — there is no separate preview
rendering path — so what an editor sees is what visitors will get.

## How a request becomes a preview

1. The Studio mints a **short-lived secret** (`createPreviewSecret`), written to the
   dataset as a `sanity.previewUrlSecret` document by the signed-in editor. It expires
   after an hour and expired ones are swept on each use.
2. The Studio opens `/api/draft/enable` on the site with that secret in the query string.
3. That route (`defineEnableDraftMode`) validates the secret **server-side** against the
   dataset. Invalid or expired gets a `401`.
4. On success it sets Next's `__prerender_bypass` cookie — `SameSite=None; Secure` in
   production, which is what lets the cross-origin Studio iframe carry it — plus a
   `sanity-preview-perspective` cookie recording whether the editor is looking at drafts
   or published content.
5. Every read goes through `sanityFetch` (`apps/web/src/lib/sanity/fetch.ts`). With draft
   mode on it switches to a token-bearing, uncached client with `perspective: 'drafts'`.
6. The site renders a banner, adds `noindex, nofollow`, and mounts `VisualEditing`.

**No shared secret is ever baked into the Studio bundle.** That bundle is public, so a
static secret in it would let anyone turn on draft mode and read unpublished content.
Minting per click is what avoids that.

## Environment variables

### `apps/web` (Infisical, and the Railway service)

| Variable                        | Required   | What it is                                                                                |
| ------------------------------- | ---------- | ----------------------------------------------------------------------------------------- |
| `SANITY_API_TOKEN`              | for drafts | Sanity **Viewer** token. Server-only — never expose it to the browser                     |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | optional   | Studio origin, for visual editing deep links. Defaults to `https://admin.jorytindall.com` |

Without `SANITY_API_TOKEN`, published browsing is unaffected — `sanityFetch` throws a
named error only if draft mode is actually switched on.

### `apps/admin` (Railway service `Admin`)

| Variable                        | Required | What it is                                                            |
| ------------------------------- | -------- | --------------------------------------------------------------------- |
| `SANITY_STUDIO_PREVIEW_URL`     | optional | The site previews open against. Defaults to `https://jorytindall.com` |
| `SANITY_STUDIO_PREVIEW_ORIGINS` | optional | Extra comma-separated origins the Presentation iframe may load        |

`SANITY_STUDIO_*` values are inlined into the public Studio bundle at build time. Only
non-secret values belong there.

## Sanity project configuration

The Studio writes the secret document with the editor's own credentials, and the site
reads it back with its token, so both origins need to be allowed:

**CORS origins** — only the **Studio** origins need to be listed, and they already are
(`https://admin.jorytindall.com`, `http://localhost:3333`, `http://127.0.0.1:3333`, each
with credentials). The website is not in the list and does not need to be: it reads
Sanity only from the server, and the visual editing overlay talks to the Studio by
`postMessage` rather than calling the API from the browser. That is why the site has
worked without `http://localhost:3000` all along.

If you ever add browser-side fetching — `@sanity/react-loader`, or `defineLive` from
`next-sanity/live` — that changes, and the site's origins have to be added with
credentials.

**Token**: Project → API → Tokens → a token with **Viewer** permission, stored as
`SANITY_API_TOKEN`. This already exists on the Railway `Web` service; a preview that
returns published content where you expected drafts is the sign that the existing token
lacks draft-read permission.

## Adding a document type to preview

One place: `ROUTE_PREFIXES` in `apps/admin/utils/previewPath.ts`. Add the `_type` and its
route prefix. Both the Presentation locations and the "Open preview" action are built
from that map, so they cannot drift apart.

A type is only previewable if `apps/web` actually has a route rendering it. Two document
types deliberately have no entry:

- `homePage` — `(home)/page.tsx` renders fixed sections plus upcoming events and never
  reads the document, so a preview would show a page its content has no effect on.
- `landingPage` — has a GROQ query but no route at all.

## Rotating and revoking

- **The read token**: create a new one in Sanity, update `SANITY_API_TOKEN` in Infisical
  and on Railway, redeploy, then revoke the old one.
- **Preview links**: they expire on their own after an hour; nothing to revoke.
- **Shared preview access**: Presentation's share feature is off until switched on from
  inside the tool. Switching it off invalidates every link handed out under it, and
  switching it back on mints a different secret.

## Staging

Preview points at **staging**, not production, so an editor previewing a draft never
touches the live site.

| Thing           | Value                                                                |
| --------------- | -------------------------------------------------------------------- |
| Railway service | `Web Staging`, in project `jorytindall`, environment `production`    |
| Deploys from    | branch `claude/jt-44-jcmm43` — move to `main` once JT-44 is merged   |
| Railway URL     | `https://web-staging-production-e9d6.up.railway.app`                 |
| Custom domain   | `https://staging.jorytindall.com`                                    |
| Build / start   | `pnpm --filter web build` / `pnpm --filter web start`, same as `Web` |

Its variables are **Railway reference variables** pointing at the `Web` service
(`${{Web.SANITY_API_TOKEN}}` and so on), not copies. One place to rotate a secret, and
staging cannot drift from production.

### DNS

`staging.jorytindall.com` needs one record in Cloudflare:

| Type    | Name      | Value                     |
| ------- | --------- | ------------------------- |
| `CNAME` | `staging` | `nbyj3n2j.up.railway.app` |

Cloudflare's SSL/TLS mode must be **Full** — _not_ Full (Strict), which Railway
documents as not working. That is a zone-wide setting and `jorytindall.com` already
resolves through Railway, so it is presumably already right; nothing to change unless
staging alone fails to get a certificate.

Until that record exists, use the `*.up.railway.app` URL, which needs no DNS.

### Pointing preview somewhere else

`SANITY_STUDIO_PREVIEW_URL` on the `Admin` service decides the target;
`SANITY_STUDIO_PREVIEW_ORIGINS` adds others an editor may switch to from inside
Presentation. Production stays selectable either way, because `previewConfig.ts` always
includes it.

## Gotchas

- **`draftMode()` throws inside `generateStaticParams`.** It runs at build time with no
  request. Those functions use `sanityClient` directly and must keep doing so; everything
  else goes through `sanityFetch`.
- **Reading `draftMode().isEnabled` does not force dynamic rendering.** While
  prerendering it resolves to `false`, so `export const revalidate = 60` still holds for
  ordinary visitors. Only `enable()`/`disable()` opt a route out of static rendering.
- **Stega encoding is off for `generateMetadata`.** Draft responses append invisible
  characters to strings so the overlay can map them back to fields; harmless in rendered
  text, but corrupting inside a `<title>`. Pass `{ stega: false }` for anything that is
  not visible text. URLs, `href`, `slug.current` and `link` are already skipped by the
  client's default filter, so links are not affected.
- **The embedded pane is cross-origin.** The Studio and the site are on different
  subdomains, so the draft cookie is a third-party cookie there. It is set with
  `SameSite=None; Secure`, which browsers currently honour, but if a browser blocks
  third-party cookies outright the pane will not hold the session. The "Open preview"
  action is the fallback: a top-level tab, so first-party.
