import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

const Seo = ({ data }) => {
	if (!data) return null;

	return (
		<Helmet
			titleTemplate="%s | Jory Tindall"
			defaultTitle="Designer, musician, and educator | Jory Tindall"
		>
			<meta charset="UTF-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<title>{data.title}</title>
			<meta
				name="application-name"
				content="Jory Tindall | Designer, musician, educator"
			/>
			<meta
				name="description"
				content={
					data.description ||
					'Designer, musician, and educator Jory Tindall.'
				}
			/>
		</Helmet>
	);
};

export default Seo;

Seo.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
};
