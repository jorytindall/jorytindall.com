import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { usePreviewSubscriptionHook } from 'lib/sanity';
import { getClient, previewClient } from 'lib/sanity.server';
import { GET_EVENTS, GET_EVENT_PATHS } from 'lib/queries';

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

	const { title } = event;

	return (
		<>
			<h1>{title}</h1>
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
