import { format, parseISO } from 'date-fns';
import { sanityClient } from 'lib/sanity/sanityClient';
import { GET_ALL_TALKS } from 'lib/queries';
import { PageTitle } from 'app/components/page-title';
import { CenteredWrapper } from 'app/components/layout';
import { linkResolver } from 'utils/linkResolver';
import { ListItem } from 'app/components/list';
import { Paragraph } from 'app/components/typography';
import { TextArrow } from 'app/components/button';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Talks | Jory Tindall',
	description: 'Speaking engagements and conference talks',
};

export default async function TalksPage() {
	const client = sanityClient;
	const talks = await client.fetch(GET_ALL_TALKS);

	const renderTalks = talks.map((talk) => {
		return (
			<ListItem
				key={talk._id}
				title={talk.title}
				link={linkResolver('talk', talk.slug)}
			>
				<Paragraph type="primary" collapse>
					{talk.description}
				</Paragraph>
				<Paragraph type="secondary" collapse>
					Given at <strong>{talk.conference}</strong> on{' '}
					<strong>
						{format(parseISO(talk.date), 'MMMM do, yyyy')}
					</strong>
				</Paragraph>
			</ListItem>
		);
	});

	return (
		<>
			<PageTitle title="🎙️ Speaking" megaTitle="Conference talks" />
			<CenteredWrapper semanticElement="section">
				{renderTalks}
				<TextArrow href='https://presentations.jorytindall.com' target='_blank' rel='noreferrer noopener'>View all presentations</TextArrow>
			</CenteredWrapper>
		</>
	);
}
