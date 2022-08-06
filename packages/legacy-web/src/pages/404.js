import React from 'react';
import { Link } from 'gatsby';

// Components
import { Layout } from '../components/layout';
import { H1, Paragraph } from '../components/typography';

const NotFound = () => {
	return (
		<Layout>
			<H1>Sorry, couldn't find that page.</H1>
			<Paragraph>
				Would you like to <Link to="/">return to the homepage?</Link>
			</Paragraph>
		</Layout>
	);
};

export default NotFound;
