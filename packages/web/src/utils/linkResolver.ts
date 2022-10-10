export function linkResolver(parent: string, slug: string) {
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
		default:
			return `${slug}`;
	}
}
