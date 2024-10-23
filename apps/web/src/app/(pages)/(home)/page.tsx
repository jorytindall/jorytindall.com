import dynamic from 'next/dynamic';
import { sanityClient } from 'lib/sanity/sanityClient';
import { GET_HOMEPAGE_DATA } from 'lib/queries';
import { BentoBox } from 'components/bento';
import { getCurrentEvents } from 'utils/getCurrentEvents';

// Dynamically import page sections
const HomeIntroduction = dynamic(() => import('./Introduction'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
});
const HomeEvents = dynamic(() => import('./Events'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
});
const HomePortfolio = dynamic(() => import('./Portfolio'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
});
const HomeMusic = dynamic(() => import('./Music'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
});
const HomeContact = dynamic(() => import('./HomeContact'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
});

import type { Metadata } from 'next';

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
