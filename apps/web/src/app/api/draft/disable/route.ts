import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Leaves draft mode and returns to the page the editor was on.
 *
 * The return path comes from the query string, so it is checked before being used:
 * anything that is not a single-slash-prefixed relative path — an absolute URL, or a
 * protocol-relative `//evil.example` — is discarded in favour of the homepage, so this
 * cannot be used as an open redirect.
 */
const resolveReturnPath = (value: string | null): string => {
	if (!value || !value.startsWith('/') || value.startsWith('//')) {
		return '/';
	}

	return value;
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	(await draftMode()).disable();

	redirect(resolveReturnPath(searchParams.get('path')));
}
