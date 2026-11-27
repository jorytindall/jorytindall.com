import { resumeResponder } from 'lib/resume/server';

// react-pdf needs Node APIs (fs for the fonts, Buffer); it cannot run on the edge.
export const runtime = 'nodejs';

/** The default résumé variant as a PDF. `?download=1` forces a download. */
export function GET(request: Request) {
	return resumeResponder.pdf(null, request);
}
