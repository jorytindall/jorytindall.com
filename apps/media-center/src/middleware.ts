import { defineMiddleware } from 'astro:middleware';
import { getSession } from './lib/session';

const PUBLIC_PATHS = ['/login', '/auth/callback', '/auth/logout'];

export const onRequest = defineMiddleware((context, next) => {
	const { pathname } = context.url;

	if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
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
