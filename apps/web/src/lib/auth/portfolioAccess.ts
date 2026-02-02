import { cookies } from 'next/headers';

const COOKIE_NAME = 'portfolio_access';

export async function hasPortfolioAccess(): Promise<boolean> {
	const cookieStore = await cookies();
	const accessCookie = cookieStore.get(COOKIE_NAME);

	if (!accessCookie?.value) {
		return false;
	}

	try {
		// Decode and validate the token
		const decoded = Buffer.from(accessCookie.value, 'base64').toString('utf-8');
		const [timestamp, password] = decoded.split(':');

		// Check if the password matches
		const correctPassword = process.env.PORTFOLIO_ACCESS_PASSWORD;
		if (password !== correctPassword) {
			return false;
		}

		// Check if the token is not expired (7 days)
		const tokenAge = Date.now() - parseInt(timestamp, 10);
		const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

		return tokenAge < maxAge;
	} catch {
		return false;
	}
}
