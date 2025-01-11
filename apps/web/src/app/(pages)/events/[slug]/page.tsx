import { compileMDX } from 'next-mdx-remote/rsc';
import { promises as fs } from 'fs';
import path from 'path';
import { EventFrontmatter } from 'types/event';
import { formatDate } from 'utils/datetimeFormat'
import { Headline, Paragraph, InlineLink } from 'components/typography';
import { GridWrapper } from 'components/layout';
import { Button } from 'components/button';
import styles from './Event.module.css';

export async function generateMetadata({ params }: { params: { slug: string }}) {
	const { slug } = await params;

	const data = await compileMDX<EventFrontmatter>({
		source: await fs.readFile(path.join(process.cwd(), 'src/content/events', `${slug}.mdx`), 'utf-8'),
		options: {
			parseFrontmatter: true,
		},
	})

	return {
		title: `${data.frontmatter.title} | Jory Tindall`,
	};
}

export default async function Event({ params }: { params: { slug: string }}) {
	const { slug } = await params;
	
	const content = await fs.readFile(path.join(process.cwd(), 'src/content/events', `${slug}.mdx`), 'utf-8');

	const data = await compileMDX<EventFrontmatter>({
		source: content,
		options: {
			parseFrontmatter: true
		},
		components: {}
	})

	const { title, startDate, endDate, location, url } = data.frontmatter;
	

	return (
		<GridWrapper>
			<section className={styles.wrapper}>
				<Headline tag="h1" color="primary" collapse>
					{title}
				</Headline>
				<Paragraph color='secondary' collapse>
					{formatDate(startDate, 'America/Los_Angeles')} at{' '}
					<InlineLink href={url} type="external">
						{location}
					</InlineLink>
				</Paragraph>
				{data.content}
				<Button href={url}>More information</Button>
			</section>
		</GridWrapper>
	);
}
