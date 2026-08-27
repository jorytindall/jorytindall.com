---
'web': patch
'admin': minor
---

Stop offering content modules the site cannot render

`moduleContent` let an editor pick five module types that had no case in
`module-renderer`, so they rendered as nothing at all — no error, no warning, just a
missing section. No published document used any of them, which is why it went
unnoticed. `hero` was worse: it shipped the literal placeholder `<p>Hero here</p>`.

- Remove `hero`, `mainImage`, `form`, `brandLogoBlock` and `impactBlock` from
  `moduleContent`. The schema files stay on disk for the 2026 redesign
- Remove `figmaEmbed` from `richText`, which had the same problem in Portable Text
- Replace the `default` case's silent `console.error` with a throw in development,
  falling back to dropping the single module in production
- Render `mainImage` in Portable Text properly. It is still offered inside every rich
  text field and used to render the literal string "This is an image"
