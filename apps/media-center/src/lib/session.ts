import { createHmac, timingSafeEqual } from 'node:crypto';
import type { AstroCookies } from 'astro';

const COOKIE_NAME = 'plex_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface SessionData {
	username: string;
	email: string;
	thumb: string;
	plexToken: string;
}

function getSecret(): string {
	const secret = import.meta.env.SESSION_SECRET;
	if (!secret || secret.length < 32) {
		throw new Error('SESSION_SECRET must be at least 32 characters');
	}
	return secret;
}

function sign(payload: string): string {
	const signature = createHmac('sha256', getSecret())
		.update(payload)
		.digest('base64url');
	return `${payload}.${signature}`;
}

function verify(signed: string): string | null {
	const lastDot = signed.lastIndexOf('.');
	if (lastDot === -1) return null;

	const payload = signed.slice(0, lastDot);
	const signature = signed.slice(lastDot + 1);

	const expected = createHmac('sha256', getSecret())
		.update(payload)
		.digest('base64url');

	const sigBuffer = Buffer.from(signature, 'base64url');
	const expectedBuffer = Buffer.from(expected, 'base64url');

	if (sigBuffer.length !== expectedBuffer.length) return null;
	if (!timingSafeEqual(sigBuffer, expectedBuffer)) return null;

	return payload;
}

export function createSession(data: SessionData, cookies: AstroCookies): void {
	const payload = Buffer.from(JSON.stringify(data)).toString('base64url');
	const signed = sign(payload);

	cookies.set(COOKIE_NAME, signed, {
		httpOnly: true,
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		path: '/',
		maxAge: MAX_AGE,
	});
}

export function getSession(cookies: AstroCookies): SessionData | null {
	const cookie = cookies.get(COOKIE_NAME);
	if (!cookie?.value) return null;

	const payload = verify(cookie.value);
	if (!payload) return null;

	try {
		return JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
	} catch {
		return null;
	}
}

export function clearSession(cookies: AstroCookies): void {
	cookies.delete(COOKIE_NAME, { path: '/' });
}
