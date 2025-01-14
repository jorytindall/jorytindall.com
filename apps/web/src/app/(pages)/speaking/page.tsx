import { promises as fs } from 'fs';
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc';
import { SpeakingFrontmatter } from 'types/speaking';
import { formatDate } from 'utils/datetimeFormat'
import { PageTitle } from 'components/page-title';
import { CenteredWrapper } from 'components/layout';
import { linkResolver } from 'utils/linkResolver';
import { ListItem } from 'components/list';
import { Paragraph } from 'components/typography';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Talks | Jory Tindall',
	description: 'Speaking engagements and conference talks',
};

export default async function TalksPage() {
	const files = await fs.readdir(path.join(process.cwd(), 'src/content/speaking'));

	const speaking = await Promise.all(files.map(async (file) => {
		const content = await fs.readFile(
			path.join(process.cwd(), 'src/content/speaking', file),
			'utf-8'
		);

		const { frontmatter } = await compileMDX<SpeakingFrontmatter>({
			source: content,
			options: {
				parseFrontmatter: true,
			},
		});

		return {
			filename: file,
			...frontmatter,
		};
	}))

	const renderTalks = speaking.map((talk) => {
		return (
			<ListItem
				key={talk.slug}
				title={talk.title}
				link={linkResolver('speaking', talk.slug)}
			>
				<Paragraph type="primary" collapse>
					{talk.description}
				</Paragraph>
				<Paragraph type="secondary" collapse>
					Given at <strong>{talk.conference.title}</strong> on{' '}
					<strong>
						{formatDate(talk.date, 'MMMM do, yyyy')}
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
