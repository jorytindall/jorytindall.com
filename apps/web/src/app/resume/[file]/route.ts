import { resumeResponder } from 'lib/resume/server';

export const runtime = 'nodejs';

/**
 * A named variant: `/resume/design-engineer.pdf` or `/resume/design-engineer.json`.
 * App Router segments cannot carry a suffix (`[variant].pdf`), so the extension is parsed
 * from the whole segment.
 */
export async function GET(request: Request, { params }: { params: Promise<{ file: string }> }) {
	const { file } = await params;
	return resumeResponder.file(file, request);
}
