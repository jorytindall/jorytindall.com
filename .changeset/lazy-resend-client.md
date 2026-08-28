---
'web': patch
---

Stop the contact form action throwing on import when RESEND_API_KEY is unset

`send-email.ts` built its Resend client at module scope. Resend's constructor
throws `Missing API key` when the key is missing, so the module died as it was
imported — before the `E2E_TEST_MODE` guard inside the function could run.

CI has no Infisical and is passed only the three Sanity secrets, so every
honeypot-empty contact submission failed there while passing locally, where
Infisical supplies the key. That was the whole of the Playwright failure in the
first run of the re-enabled `ci-web.yml`: 45 passed, 3 failed, one test across
three browsers.

The client is now constructed after the guard, so the guard does what its own
comment claims and a missing key surfaces at call time rather than at import.
