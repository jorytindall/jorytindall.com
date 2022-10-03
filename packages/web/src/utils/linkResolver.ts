export function linkResolver(parent: string, slug: string) {
	switch (parent) {
		case 'page':
			return `/${slug}`;
		case 'post':
			return `/blog/${slug}`;
		case 'portfolio':
			return `/portfolio/${slug}`;
		case 'event':
			return `/events/${slug}`;
		case 'music':
			return `/music/${slug}`;
		case 'landingPage':
			return `/p/${slug}`;
		default:
			return null;
	}
}
