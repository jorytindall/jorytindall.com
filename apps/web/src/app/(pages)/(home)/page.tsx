import { promises as fs } from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import { EventFrontmatter } from 'types/event'
import { BentoBox } from 'components/bento';
import { getCurrentEvents } from 'utils/getCurrentEvents';

// Import page sections
import HomeIntroduction from './Introduction';
import HomeEvents from './Events';
import HomePortfolio from './Portfolio';
import HomeMusic from './Music';
import HomeContact from './HomeContact';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Jory Tindall | Designer, saxophone artist, educator.',
	description:
		'Home of Jory Tindall; User experience designer, saxophone artist, and music educator based in Seattle, Washington.',
};

export default async function Home() {

	const files = await fs.readdir(path.join(process.cwd(), 'src/content/events'));
	const events = await Promise.all(files.map(async (file) => {
		const { frontmatter } = await compileMDX<EventFrontmatter>({
			source: await fs.readFile(path.join(process.cwd(), 'src/content/events', file), 'utf-8'),
			options: {
				parseFrontmatter: true,
			},
		})
		return {
			filename: file,
			...frontmatter,
		}
	}))

	const currentEvents = getCurrentEvents(events);

	return (
		<BentoBox isFullBleed>
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
