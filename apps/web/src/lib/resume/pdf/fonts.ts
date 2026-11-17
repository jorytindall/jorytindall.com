import path from 'node:path';
import { Font } from '@react-pdf/renderer';

/**
 * Typefaces for the résumé PDF: the site's own faces, embedded (subset) in the file.
 * Neue Haas Unica for body text, Uxum Grotesque for the name and section headings —
 * the same split as the `body` / `headline` font-family tokens.
 *
 * react-pdf reads TTF, OTF and WOFF but not WOFF2, so these point at the `.woff` files in
 * `public/fonts/`. Paths resolve from the working directory, which is `apps/web` for
 * `next dev`, `next start` and Vitest alike.
 */
export const FONT = {
	body: 'Neue Haas Unica',
	heading: 'Uxum Grotesque',
};

const fontsDir = path.join(process.cwd(), 'public', 'fonts');
const unica = (file: string) =>
	path.join(fontsDir, 'neue-haas-unica', `NeueHaasUnicaPro-${file}.woff`);
const uxum = (file: string) => path.join(fontsDir, 'uxum-grotesque', `UxumGrotesque-${file}.woff`);

let configured = false;

/** Idempotent; call before rendering. */
export function configureFonts() {
	if (configured) return;

	Font.register({
		family: FONT.body,
		fonts: [
			{ src: unica('Regular'), fontWeight: 'normal' },
			{ src: unica('Italic'), fontWeight: 'normal', fontStyle: 'italic' },
			{ src: unica('Medium'), fontWeight: 'medium' },
			{ src: unica('Bold'), fontWeight: 'bold' },
		],
	});
	Font.register({
		family: FONT.heading,
		fonts: [
			{ src: uxum('Regular'), fontWeight: 'normal' },
			{ src: uxum('Medium'), fontWeight: 'medium' },
			{ src: uxum('Bold'), fontWeight: 'bold' },
		],
	});

	// No automatic hyphenation: a word split across lines extracts as two fragments in
	// applicant tracking systems, and it looks wrong in a résumé anyway.
	Font.registerHyphenationCallback((word) => [word]);
	configured = true;
}
