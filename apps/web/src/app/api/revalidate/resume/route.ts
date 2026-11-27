import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { RESUME_CACHE_TAG } from 'lib/resume/server';

const RESUME_TYPES = ['resumeProfile', 'resume', 'experience', 'skillGroup', 'education'];

/**
 * Sanity webhook: on publish of any résumé document, expire the cached PDFs and JSON so
 * the next request rebuilds them. Signed with SANITY_REVALIDATE_SECRET.
 */
export async function POST(request: NextRequest) {
	const secret = process.env.SANITY_REVALIDATE_SECRET;
	if (!secret) {
		console.error('[resume] SANITY_REVALIDATE_SECRET is not set; ignoring webhook');
		return NextResponse.json({ error: 'Not configured' }, { status: 500 });
	}

	const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret);
	if (!isValidSignature) {
		return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
	}
	if (!body?._type || !RESUME_TYPES.includes(body._type)) {
		return NextResponse.json({ revalidated: false, reason: 'Not a résumé document' });
	}

	// Expire immediately rather than serve stale-while-revalidate: a publish should show up
	// on the next request.
	revalidateTag(RESUME_CACHE_TAG, { expire: 0 });
	return NextResponse.json({ revalidated: true, type: body._type });
}
