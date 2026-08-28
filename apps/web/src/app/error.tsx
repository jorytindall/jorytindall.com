'use client';

import { useEffect } from 'react';
import { Container } from 'components/layout';
import { Headline, Paragraph } from 'components/typography';
import { Button, ButtonGroup, TextArrow } from 'components/button';

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		// The digest is the only handle on the server-side stack, which Next strips
		// from the client payload in production.
		console.error(error);
	}, [error]);

	return (
		<Container
			isFlex={true}
			flexDirection="column"
			justify="center"
			align="center"
			textAlign="center"
			gap="default"
			semanticElement="section"
		>
			<Headline color="primary" tag="h1" size="h1" collapse>
				500 🤒
			</Headline>
			<Paragraph collapse>
				Something broke on my end, not yours. Try again in a moment.
			</Paragraph>
			<ButtonGroup>
				<Button onClick={() => reset()}>Try again</Button>
				<TextArrow href="/">Go back home</TextArrow>
			</ButtonGroup>
		</Container>
	);
}
