import { sanityClient } from 'lib/sanity/sanityClient';
import { GET_HOMEPAGE_DATA } from 'lib/queries';
import { BentoBox } from 'components/bento';
import { getCurrentEvents } from 'utils/getCurrentEvents';

// Page content
import { HomeIntroduction } from './Introduction';
import { HomeEvents } from './Events';
import { HomePortfolio } from './Portfolio';
import { HomeMusic } from './Music';

import type { Metadata } from 'next';
import { HomeContact } from './HomeContact';

// Revalidate events every minute
export const revalidate = 60;

export const metadata: Metadata = {
	title: 'Jory Tindall | Designer, saxophone artist, educator.',
	description:
		'Home of Jory Tindall; User experience designer, saxophone artist, and music educator based in Seattle, Washington.',
};

export default async function Home() {
	const homePage = await sanityClient.fetch(GET_HOMEPAGE_DATA);

	const currentEvents = getCurrentEvents(homePage);

	return (
		<BentoBox>
			<HomeIntroduction />
			{currentEvents.length > 0 ?
				(<HomeEvents events={currentEvents} />) : null
			}
			<HomePortfolio />
			<HomeMusic />
			<HomeContact />
		</BentoBox>
	);
}
