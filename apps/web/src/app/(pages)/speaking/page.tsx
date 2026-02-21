import { sanityClient } from 'lib/sanity/config';
import { formatLongDate } from 'utils/datetimeFormat';
import { GET_ALL_TALKS } from 'lib/queries';
import { PageTitle } from 'components/page-title';
import { CenteredWrapper } from 'components/layout';
import { linkResolver } from 'utils/linkResolver';
import { ListItem } from 'components/list';
import { Paragraph } from 'components/typography';

import type { Metadata } from 'next';

// Revalidate talks every minute
export const revalidate = 60;

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
				link={linkResolver('speaking', talk.slug)}
			>
				<Paragraph type="primary" collapse>
					{talk.description}
				</Paragraph>
				<Paragraph type="secondary" collapse>
					Given at <strong>{talk.conference}</strong> on{' '}
					<strong>
						{formatLongDate(talk.date)}
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
			</CenteredWrapper>
		</>
	);
}
