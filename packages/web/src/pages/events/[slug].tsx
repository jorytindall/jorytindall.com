import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { format, formatISO, parseISO } from 'date-fns'
import { useNextSanityImage } from 'next-sanity-image';
import { usePreviewSubscriptionHook } from 'lib/sanity';
import { getClient, previewClient, sanityClient } from 'lib/sanity.server';
import { GET_EVENTS, GET_EVENT_PATHS } from 'lib/queries';
import { Headline, Paragraph, InlineLink } from 'components/typography'
import { RichText } from 'components/rich-text';

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

	const { title, date, description, location, image, url } = event;

	const imageProps = useNextSanityImage(
		sanityClient,
		image,
	)

	console.log(description)

	return (
		<>
			<Image {...imageProps} alt={image.alternativeText} />
			<Headline type='h1' collapse>{title}</Headline>
			<Paragraph collapse>{format(parseISO(date), 'MMMM do, yyyy')} at <InlineLink href={url} type='external'>{location}</InlineLink></Paragraph>
			<RichText value={description.content} />
		</>
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
