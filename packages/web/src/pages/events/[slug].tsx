import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { format, parseISO } from 'date-fns';
import { usePreviewSubscriptionHook } from 'lib/sanity';
import { getClient, previewClient } from 'lib/sanity.server';
import { GET_EVENTS, GET_EVENT_PATHS } from 'lib/queries';
import { Headline, Paragraph, InlineLink } from 'components/typography';
import { RichText } from 'components/rich-text';
import { Layout, GridWrapper } from 'components/layout';
import { Button } from 'components/button';
import { MetaHead } from 'components/meta';
import { linkResolver } from 'utils/linkResolver';
import styles from 'styles/pages/Event.module.scss';

export default function Event({ data, preview }) {
	const router = useRouter();

	const { data: event } = usePreviewSubscriptionHook(GET_EVENTS, {
		params: { slug: data.event?.slug },
		initialData: data.event,
		enabled: preview && data.event?.slug,
	});

	if (!router.isFallback && !data.event?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	const { title, date, description, location, image, url, slug } = event;

	return (
		<Layout>
			<MetaHead
				title={title}
				description={title}
				slug={linkResolver('event', slug)}
			/>
			<GridWrapper>
				<section className={styles.wrapper}>
					<Headline tag="h1" collapse>
						{title}
					</Headline>
					<Paragraph collapse>
						{format(parseISO(date), 'MMMM do, yyyy')} at{' '}
						<InlineLink href={url} type="external">
							{location}
						</InlineLink>
					</Paragraph>
					<RichText value={description.content} />
					<Button href={url}>Get tickets</Button>
				</section>
			</GridWrapper>
		</Layout>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const event = await getClient(preview).fetch(GET_EVENTS, {
		slug: params.slug,
	});

	return {
		props: {
			preview,
			data: { event },
		},
	};
}

export async function getStaticPaths() {
	const paths = await getClient(previewClient).fetch(GET_EVENT_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}
