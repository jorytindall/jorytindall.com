import React from 'react';
import { InternalLink } from '../typography';

const ResolvedLink = ({ data, children }) => {
	const linkResolver = (data) => {
		switch (data.reference._type) {
			case `page`:
				return `/${data.reference.slug.current}`;
			case `post`:
				return `/${data.reference.publishedDate}/${data.reference.slug.current}`;
			case `portfolioProject`:
				return `/portfolio/${data.reference.slug.current}`;
			default:
				return `/${data.reference.slug.current}`;
		}
	};

	return (
		<InternalLink
			to={linkResolver(data)}
			alt={data.title}
			textDecoration="underline"
		>
			{children}
		</InternalLink>
	);
};

export default ResolvedLink;
