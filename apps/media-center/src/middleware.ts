import { defineMiddleware } from 'astro:middleware';
import { getSession } from './lib/session';

const PUBLIC_PATHS = ['/login', '/auth/callback', '/auth/logout'];

/**
 * Exact match, or the path plus a `/` separator. A bare `startsWith` would also let
 * `/login-anything` through the auth gate.
 */
function isPublicPath(pathname: string): boolean {
	return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export const onRequest = defineMiddleware((context, next) => {
	const { pathname } = context.url;

	if (isPublicPath(pathname)) {
		context.locals.user = null;
		return next();
	}

	const session = getSession(context.cookies);

	if (!session) {
		return context.redirect('/login');
	}

	context.locals.user = {
		username: session.username,
		email: session.email,
		thumb: session.thumb,
	};

	return next();
});
