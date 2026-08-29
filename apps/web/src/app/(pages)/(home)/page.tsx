import { sanityClient } from 'lib/sanity/config';
import { GET_HOMEPAGE_DATA } from 'lib/queries';
import { BentoBox } from 'components/bento';

// Page content
import HomeIntroduction from './Introduction';
import HomeEvents from './Events';
import HomePortfolio from './Portfolio';
import HomeMusic from './Music';

import HomeContact from './HomeContact';

// No `metadata` export: the homepage is the root layout's `title.default` and
// `description`. Anything set here would pick up the ` | Jory Tindall` suffix.

// Revalidate events every minute
export const revalidate = 60;

export default async function Home() {
	const events = await sanityClient.fetch(GET_HOMEPAGE_DATA);

	return (
		<BentoBox>
			<HomeIntroduction />
			{events.length > 0 ? <HomeEvents events={events} /> : null}
			<HomePortfolio />
			<HomeMusic />
			<HomeContact />
		</BentoBox>
	);
}
