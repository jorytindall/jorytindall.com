export function linkResolver(parent, slug) {
	switch (parent) {
		case 'page':
			return `${slug}`;
		case 'post':
			return `blog/${slug}`;
		case 'portfolioProject':
			return `portfolio/${slug}`;
		case 'portfolio':
			return `portfolio/${slug}`;
		case 'event':
			return `events/${slug}`;
		case 'musicProject':
			return `music/${slug}`;
		case 'music':
			return `music/${slug}`
		case 'landingPage':
			return `p/${slug}`;
		case 'speaking':
			return `speaking/${slug}`;
		case 'pressKit':
			return `press-kit/${slug}`;
		default:
			return `${slug}`;
	}
}
