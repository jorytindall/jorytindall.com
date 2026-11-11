---
'admin': minor
---

Add the résumé data model (JT-64, phase 1): a `resumeProfile` singleton plus `experience`, `skillGroup`, `education` and `resume` (variant) documents, with supporting `resumeLink`, `resumeHighlight` and `resumeExperienceEntry` objects. Fields map onto the JSON Resume schema. The Studio now uses `structureTool` with a "Résumé" section that pins the profile singleton; all other document types are listed as before.
