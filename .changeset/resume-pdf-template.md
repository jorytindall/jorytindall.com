---
'web': minor
---

Add the one-page résumé PDF template (JT-64, phase 3): a single-column `@react-pdf/renderer` document rendered from JSON Resume, with document metadata, selectable text, and a portfolio link in place of a projects section. `renderResumePdf` refuses to return more than one page, and a test renders a snapshot of the real résumé content to guard the one-page fit. Typeset in the site's Neue Haas Unica and Uxum Grotesque, embedded as subsets. No route serves it yet; that is phase 4.
