import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { previewSecretClient } from 'lib/sanity/config';

/**
 * Turns Next's draft mode on, for both preview entry points:
 *
 * - the Presentation tool's iframe in the Studio, and
 * - the "Open preview" document action, which opens a top-level tab.
 *
 * Both sign their URL with a short-lived secret that the Studio writes to the dataset as
 * the signed-in editor, and this route validates that secret server-side before setting
 * any cookie. An invalid or expired secret gets a 401, so possessing the URL alone is
 * not enough to read drafts — which is why no shared secret is baked into the Studio
 * bundle, where it would be readable by anyone.
 *
 * The cookies are written with `SameSite=None; Secure` in production, which is what lets
 * the cross-origin Studio iframe carry them.
 */
export const { GET } = defineEnableDraftMode({ client: previewSecretClient });
