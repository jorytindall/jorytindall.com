import { Font } from '@react-pdf/renderer';

/**
 * Typeface for the résumé PDF.
 *
 * Helvetica is one of the 14 standard PDF fonts: every reader has it, nothing is embedded,
 * there is no licence to check, and text extracts cleanly for applicant tracking systems.
 *
 * To switch to a brand face, register static TTF/OTF files here with `Font.register` and
 * change the family names below. Check the licence first: a web-font licence for Neue Haas
 * Unica or Uxum Grotesque does not normally cover embedding in a PDF. Avoid variable fonts;
 * react-pdf can misrender them.
 */
export const FONT = {
	regular: 'Helvetica',
	bold: 'Helvetica-Bold',
	italic: 'Helvetica-Oblique',
};

let configured = false;

/** Idempotent; call before rendering. */
export function configureFonts() {
	if (configured) return;
	// No automatic hyphenation: a word split across lines extracts as two fragments in
	// applicant tracking systems, and it looks wrong in a résumé anyway.
	Font.registerHyphenationCallback((word) => [word]);
	configured = true;
}
