import { promises as fs } from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import { SpeakingFrontmatter } from 'types/speaking';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { sanityClient } from 'lib/sanity/sanityClient';
import { getSanityImageUrl } from 'utils/getSanityImage';
import { GET_TALKS, GET_TALK_PATHS } from 'lib/queries';
import { Headline, Paragraph } from 'components/typography';
import { ModuleRenderer } from 'components/module-renderer';
import { GridWrapper } from 'components/layout';
import { Button } from 'components/button';
import styles from './Talk.module.css';

export async function generateMetadata({ params }) {
	const { slug } = await params;

	const data = await compileMDX<SpeakingFrontmatter>({
		source: await fs.readFile(path.join(process.cwd(), 'src/content/speaking', `${slug}.mdx`), 'utf-8'),
		options: {
			parseFrontmatter: true,
		}
	})

	return {
		title: `${data.frontmatter.title} | Jory Tindall`,
	};
}

// export async function generateStaticParams() {
// 	const client = sanityClient;
// 	const slugs = await client.fetch(GET_TALK_PATHS);
// 	return slugs.map((slug) => ({ slug }));
// }

export default async function Talk({ params }) {
	const { slug } = await params;

	const content = await fs.readFile(path.join(process.cwd(), 'src/content/speaking', `${slug}.mdx`), 'utf-8');

	const data = await compileMDX<SpeakingFrontmatter>({
		source: content,
		options: {
			parseFrontmatter: true,
		},
		components: {}
	})

	const {
		title,
		conference,
		description,
		date,
		deck,
		image,
		url
	} = data.frontmatter;

	return (
		<GridWrapper>
			<div className={styles.wrapper}>
				{image && (
					<div className={styles.imageWrapper}>
						<Image
							fill
							src={image.asset}
							alt={image.alt}
						/>
					</div>
				)}
				<div className={styles.metadata}>
					{title && (
						<Headline tag="h1" size="h1" color="primary" collapse>
							{title}
						</Headline>
					)}
					<Paragraph type="secondary" collapse>
						Given at{' '}
						<a href={conference.url} target="blank">
							{conference.title}
						</a>{' '}
						on {format(parseISO(date), 'MMMM do, yyyy')}
					</Paragraph>
					<div className={styles.actions}>
						{url && (
							<Button variant="primary" href={url}>
								See the talk
							</Button>
						)}
						{deck && (
							<Button variant="secondary" href={deck}>
								Spec the deck
							</Button>
						)}
					</div>
					{data.content}
				</div>
			</div>
		</GridWrapper>
	);
}
