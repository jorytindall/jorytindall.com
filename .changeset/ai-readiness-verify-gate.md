---
'admin': minor
'presentations': patch
'media-center': patch
'web': patch
'tokens': patch
---

Add a `pnpm verify` gate (format + lint + typecheck) across every workspace, and an
AGENTS.md contract for the repo and each workspace.

**`admin` behavior change worth knowing about:** ten validation rules were written with a
block body and no return, so Sanity had been applying no validation at all. They now
work. Fields on `musicProject`, `person`, `talk`, `audio` and `playlist` that were always
meant to be required are now actually required — an existing draft missing one of them
will start reporting a validation error in the Studio. `resultItem` also had a `desctipn`
typo that meant its help text never rendered.

`presentations` picks up three fixes that were silently doing nothing: a `date-auto-animate`
typo for the `autoAnimate` prop, `gap="x-small"` with no matching CSS rule, and two
invalid `Box` props.
