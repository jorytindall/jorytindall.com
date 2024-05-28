export function linkResolver(parent, slug) {
	switch (parent) {
		case 'page':
			return `${slug}`;
		case 'post':
			return `blog/${slug}`;
		case 'portfolioProject' || 'portfolio':
			return `portfolio/${slug}`;
		case 'event':
			return `events/${slug}`;
		case 'musicProject' || 'music':
			return `music/${slug}`;
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
