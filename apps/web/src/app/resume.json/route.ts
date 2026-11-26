import { resumeResponder } from 'lib/resume/server';

export const runtime = 'nodejs';

/** The default résumé variant as JSON Resume (https://jsonresume.org/schema). */
export function GET(request: Request) {
	return resumeResponder.json(null, request);
}
