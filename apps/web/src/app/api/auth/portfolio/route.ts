import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'portfolio_access';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: NextRequest) {
	try {
		const { password } = await request.json();

		if (!password) {
			return NextResponse.json(
				{ error: 'Password is required' },
				{ status: 400 }
			);
		}

		const correctPassword = process.env.PORTFOLIO_ACCESS_PASSWORD;

		if (!correctPassword) {
			console.error('PORTFOLIO_ACCESS_PASSWORD environment variable is not set');
			return NextResponse.json(
				{ error: 'Server configuration error' },
				{ status: 500 }
			);
		}

		if (password !== correctPassword) {
			return NextResponse.json(
				{ error: 'Invalid password' },
				{ status: 401 }
			);
		}

		// Create a simple token (in production, consider using a signed JWT)
		const token = Buffer.from(`${Date.now()}:${correctPassword}`).toString('base64');

		const cookieStore = await cookies();
		cookieStore.set(COOKIE_NAME, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: COOKIE_MAX_AGE,
			path: '/',
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Portfolio auth error:', error);
		return NextResponse.json(
			{ error: 'An error occurred' },
			{ status: 500 }
		);
	}
}

export async function DELETE() {
	const cookieStore = await cookies();
	cookieStore.delete(COOKIE_NAME);
	return NextResponse.json({ success: true });
}
