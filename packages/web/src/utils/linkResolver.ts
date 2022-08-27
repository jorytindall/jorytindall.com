interface ResolverProps {
    parent: string,
    slug: string,
}

export function linkResolver({ parent, slug }: ResolverProps) {
    switch (parent) {
        case 'page': return `/${slug}`;
        case 'post': return `/blog/${slug}`;
        case 'portfolio': return `/portfolio/${slug}`;
        case 'event': return `/event/${slug}`;
        case 'music': return `/music/${slug}`;
        case 'landingPage': return `/p/${slug}`;
        default: return null
    }
}