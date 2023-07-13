import Image from 'next/image';
import { InlineLink, Headline, Paragraph } from 'components/typography';
import { Layout, Container } from 'components/layout';
import { MetaHead } from 'components/meta';

export default function Custom404() {
	return (
		<Layout>
			<MetaHead
				title="404: bummer dude, couldn&lsquo;t find that page."
				description="404: bummer dude, couldn&lsquo;t find that page."
				slug="404"
			/>
			<Container
				semanticElement="div"
				isFlex
				flexDirection="column"
				align="center"
				density="packed"
				textAlign="center"
			>
				<Image
					src="/images/not-found-confused.gif"
					alt="Page not found"
					width={600}
					height={350}
					priority
				/>
				<Headline tag="h1">404, not found :(</Headline>
				<Paragraph>
					Bummer dude, couldn&apos;t find that page. Would you like to
					go{' '}
					<InlineLink type="internal" href="/">
						back to the homepage?
					</InlineLink>
				</Paragraph>
			</Container>
		</Layout>
	);
}
