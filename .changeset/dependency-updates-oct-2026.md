---
'web': patch
'admin': patch
'presentations': patch
'media-center': patch
'tokens': patch
---

Update all dependencies to the latest versions within their declared semver ranges.

This clears 228 of 262 audit advisories, including five critical Next.js RCEs (image
optimization via AVIF and SVG, `next/og` ImageResponse, `use cache` typed arrays, and
the Windows-host RCE) — all fixed by Next 16.4.3.

Also bumps `sharp` to ^0.35.5, which is what Next 16.4.3 itself declares as its optional
dependency, resolving three high-severity libvips, libheif and librsvg CVEs.

Astro remains on 5.x and still carries a critical AVIF image-optimization RCE; patching
it requires a two-major upgrade to Astro 7 and is deliberately left to its own change.
