import { sanityClient } from 'lib/sanity/config';
import { GET_HOMEPAGE_DATA } from 'lib/queries';
import { BentoBox } from 'components/bento';

// Page content
import HomeIntroduction from './Introduction';
import HomeEvents from './Events';
import HomePortfolio from './Portfolio';
import HomeMusic from './Music';

import type { Metadata } from 'next';
import HomeContact from './HomeContact';

// Revalidate events every minute
export const revalidate = 60;

export const metadata: Metadata = {
	title: 'Jory Tindall | Designer, saxophone artist, educator.',
	description:
		'Home of Jory Tindall; User experience designer, saxophone artist, and music educator based in Seattle, Washington.',
};

export default async function Home() {
	const events = await sanityClient.fetch(GET_HOMEPAGE_DATA);

	return (
		<BentoBox>
			<HomeIntroduction />
			{events.length > 0 ?
				(<HomeEvents events={events} />) : null
			}
			<HomePortfolio />
			<HomeMusic />
			<HomeContact />
		</BentoBox>
	);
}